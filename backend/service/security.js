let jwt = require('jsonwebtoken');

function generateToken (data) {
    const secretKey = process.env.JWT_SECRET || "secretkey@123";
    let token = jwt.sign(data, secretKey, {expiresIn: "24h"});
    return token;
}
module.exports = {generateToken};