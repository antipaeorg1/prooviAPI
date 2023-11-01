const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).send('Unauthorized access');
    }

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (error, user) => {
        if (error) {
            return res.status(404).send('Access token expired');
        }
        req.user = user;
        next();
    });
};

module.exports = {authenticateToken};