let jwt = require('jsonwebtoken');
let secretkey = "secretkey";
function generateToken (data) {
    let token = jwt.sign(data , secretkey)
    return token;
}
module.exports = {generateToken};