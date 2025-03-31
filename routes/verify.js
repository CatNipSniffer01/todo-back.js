const express = require('express');
const router = express.Router();
const { register, verifyEmail } = require('../controllers/authController'); // Adjust path as needed

// Registration route
router.post('/register', register);

// Email verification route
router.get('/verify/:token', verifyEmail);

module.exports = router;