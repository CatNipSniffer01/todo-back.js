// api/controllers/authController.js
require('dotenv').config();
const db = require('../models');
const User = db.Users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const secret = 'your_jwt_secret'; // Use environment variables in production
const jwtSecret = process.env.JWT_SECRET;

const sendVerificationEmail = async (email, token) =>{
  const transporter = nodemailer.createTransport({
    service: 'gmail',  //email provider
    auth:{
      user: 'czovek.balazs41@gmail.com',
      pass: 'testTest001'
    },
  });

  const mailOptions = {
    from: 'czovek.balazs41@gmail.com',
    to: email,
    subject: 'User Verification',
    html: `<p>Please verify your email by clicking this link:<br> <a href:"http:localhost:5000/verify/${token}">Verify Email</a></p>`
  }

  await transporter.sendMail(mailOptions)
}

exports.register = async (req, res) => {
  try {
    const { userName, email, password, isAdmin } = req.body;
    const existingUser = await user.findOne({where: {email}})
    if (existingUser){
      return res.status(400).json({message: 'Email is already in use'})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
      acc_CR_D: new Date(),
      acc_UP_D: new Date(),
      isVerified: false, //create database field dumbass
    });

    const token = jwt.sign({ email: user.email, userId: user.id}, jwtSecret, {expiresIn: '1h'})
    await sendVerificationEmail(user.email, token)

    res.json({ message: 'Registration successful, Please check your email to verify your account!', emailNotifSent: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

exports.verifyEmail = async (req, res) =>{
  try{
    const {token} = req.params;
    const decoded = jwt.verify(token, jwtSecret);
    const user = await user.findOne({where: {email: decoded.email}});

    if (!user){
      return res.status(400).json({message: 'invalid token or user not found. '});
    }

    user.isVerified = true;
    await user.save();

    res.json({message: 'Email successfully verified!'});
  } catch (err){
    res.status(500).json({message: 'Verification failed', error:err.message});
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid password' });
    const token = jwt.sign({ id: user.user_Id, isAdmin: user.isAdmin }, secret, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
