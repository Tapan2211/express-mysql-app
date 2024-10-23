const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    // Create a JWT token that expires in 1 hour
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    generateToken,
    verifyToken,
}