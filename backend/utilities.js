const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Fix header access method

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => { // Corrected variable names
        if (err) return res.sendStatus(403); // Send 403 for forbidden
        req.user = user;
        next();
    });
}

module.exports = {
    authenticateToken,
};
