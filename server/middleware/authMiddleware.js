// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    // Get the token from the request header or cookies
    const token = req.header('Authorization') || req.cookies.token;

    if (!token) {
        // If no token is present, the user is not authenticated
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify the token and extract user information
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user information to the request object
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authenticateUser;