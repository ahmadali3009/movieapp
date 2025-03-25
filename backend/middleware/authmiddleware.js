let jwt = require('jsonwebtoken');
let  secretkey = "secretkey";
function authmiddleware(req, res, next) {
    if(req.headers.authorization) {
        let token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, secretkey);
        console.log("decoded", decoded)
        req.user = decoded;
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = authmiddleware;