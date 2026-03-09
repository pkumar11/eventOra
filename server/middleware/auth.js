const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes and ensure the user is authenticated
const protect = async (req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer')) {
        try {
            token = token.split(' ')[1]; // Extract the token from the "Bearer <token>" format
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
            req.user = await User.findById(decoded.id).select('-password'); // Fetch the user from the database and attach it to the request object, excluding the password
            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }
            next();// Proceed to the next middleware or route handler
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

module.exports = { protect, admin };