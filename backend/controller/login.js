const e = require('cors');
let usersignup = require('../model/signup');


async function handleloginuser(req, res) {
    try{
        let {email , password} = req.body;
        console.log("email" , email)
        console.log("password" , password)
        if(!email || !password)
        {
            return res.status(400).json({message: "missing required fields"})
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
        console.log("success")
        return res.status(200).json({message: "login success"})
    }
    catch(error)
    {
        return res.status(500).json({message: error.message})
    }
}

module.exports = handleloginuser;