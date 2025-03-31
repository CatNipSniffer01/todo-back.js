const jwt = require('jsonwebtoken');
const user = require('../models/user');

exports.verifyEmail = async (req, res) => {
    try {
        const {token} = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await user.findOne({where: {email: decoded}});

        if (!user){
            return res.status(400).json({message: 'Invalid token or user not found!'});
        }

        user.isVerified = true;
        await user.save();
        res.json({message: 'Email succesfully verified! '});
    } catch (err){
        console.error(err);
        res.status(500).json({message: 'Verification failed! ', error: err.message})
    }
}