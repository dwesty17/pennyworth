const jwt = require('jsonwebtoken');

const JWT_KEY = process.env.JWT_KEY || "secret";

const auth = (req, res, next) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];

    if (!token) {
        console.warn("👮 Received request without jwt token");
        return res.status(401).send("Access denied. No token provided.");
    }

    try {
        req.user = jwt.verify(token, JWT_KEY);
        next();
    } catch (error) {
        // TODO handle the different reasons for a token being invalid (timeout vs tampered with etc)
        console.error("🤔 Invalid jwt provided", error);
        res.status(400).send("Invalid token.");
    }

    next();
};

module.exports = auth;