let usersignup = require('../model/signup');


async function handlecreateuser(req, res) {
    try {
        
        let { email, password, username } = req.body
        // Input validation
        if (!email || !password || !username) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        // user exist
        let userexist = await usersignup.findOne({ email })
        if (userexist) {
            return res.status(400).json({ message: "user already exist" })

        }
        // create user
        let user = await usersignup.create({
            email,
            password,
            username
        })

        if (!user) {
           return res.status(400).json({ message: "user not created" })
        }
        return  res.status(201).json({ message: "user created" })
    }
    catch (error) {
       return res.status(500).json({ message: error.message })
    }
}

module.exports = handlecreateuser;
