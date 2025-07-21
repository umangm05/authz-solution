const jwt = require('jsonwebtoken');

const verifyRole = (role: string) => (req, res, next) => {
    const userRole = req.user.role; // Assuming role is stored in JWT
    if (userRole !== role) {
        return res.status(403).send('Access Denied');
    }
    next();
};


const verifyToken = (req, res, next) => {
    // Get token from the header
    const token = req.headers['authorization']?.split(' ')[1];

    // Check if the token is provided
    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        // Token is valid, store the decoded user data in request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    });
};

export default verifyToken;


module.exports = { verifyRole, verifyToken };