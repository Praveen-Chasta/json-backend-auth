const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function userMiddleware(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({
            msg: "Authorization header is missing"
        });
    }

    const parts = authorizationHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(400).json({
            msg: "Authorization header is not in the correct format"
        });
    }

    const token = parts[1];

    try {
        const decodedValue = jwt.verify(token, JWT_SECRET);

        if (decodedValue.username) {
            req.username = decodedValue.username;
            next();
        } else {
            res.status(400).json({
                msg: "User does not exist"
            });
        }
    } catch (e) {
        console.error(e); // Log the error for debugging purposes
        res.status(401).json({
            msg: "Incorrect or expired token"
        });
    }
}

module.exports = userMiddleware;
