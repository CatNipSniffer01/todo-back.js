// api/routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, userController.getUsers);
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
