// api/middleware/auth.js
const jwt = require('jsonwebtoken');
const secret = 'sajtosstangli'; // Use environment variables in production

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Could not authenticate token' });
        }
        req.user = decoded;
        next();
    });
};
