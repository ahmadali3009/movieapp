let jwt = require('jsonwebtoken');
let secretkey = "secretkey";
function generateToken (data) {
    let token = jwt.sign(data , secretkey , {expiresIn: "5s"});
    return token;
}
module.exports = {generateToken};