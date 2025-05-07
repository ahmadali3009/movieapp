const e = require('cors');
let usersignup = require('../model/signup');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../service/security');
const { validateLoginData } = require('../utils/validation');

async function handleloginuser(req, res) {
    try{
        let {email , password} = req.body;
        console.log("email" , email)
        console.log("password" , password)

        // Validate login data
        const validation = validateLoginData({ email, password });
        if (!validation.isValid) {
            return res.status(400).json({ message: validation.message });
        }
        let user = await usersignup.findOne({email: email})
        if(!user)
        {
            return res.status(400).json({message: "user not found"})
        }
        if(user.password !== password)
        {
            console.log("some thing wrong")
            return res.status(400).json({message: "some thing wrong"})
        }
        let token = generateToken({email: user.email , id: user._id , createdAt: Date.now()})
        console.log("success")
        return res.status(200).json({message: "login success" , token: token})
    }
    catch(error)
    {
        return res.status(500).json({message: error.message})
    }
}

module.exports = handleloginuser;