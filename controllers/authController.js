// api/controllers/authController.js
const db = require('../models');
const User = db.Users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = 'your_jwt_secret'; // Use environment variables in production

exports.register = async (req, res) => {
  try {
    const { userName, email, password, isAdmin } = req.body;
    const existingUser = await user.findOne({where: {email}})
    if (existingUser){
      return res.status(400).json({message: "Email is already in use"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
      acc_CR_D: new Date(),
      acc_UP_D: new Date(),
    });
    res.json({ message: 'Registration successful', emailNotifSent: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
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
