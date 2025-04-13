let jwt = require('jsonwebtoken');
let secretkey = "secretkey";
function generateToken (data) {
    let token = jwt.sign(data , secretkey , {expiresIn: "24h"});
    return token;
}
module.exports = {generateToken};