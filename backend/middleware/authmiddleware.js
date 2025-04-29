let jwt = require('jsonwebtoken');

function authmiddleware(req, res, next) {
    console.log("req.headers.authorization", req.headers.authorization)
    if(req.headers.authorization) {
        try {
            let token = req.headers.authorization.split(" ")[1];
            const secretKey = process.env.JWT_SECRET || "default_secret_key";
            let decoded = jwt.verify(token, secretKey);
            console.log("decoded", decoded)
            req.user = decoded;
            next();
        } catch (error) {
            console.error("JWT verification error:", error.message);
            res.status(401).json({ message: "Invalid or expired token" });
        }
    } else {
        res.status(401).json({ message: "Unauthorized: No token provided" });
    }
}

module.exports = authmiddleware;