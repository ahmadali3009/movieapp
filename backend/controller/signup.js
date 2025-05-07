let usersignup = require('../model/signup');
const { validateSignupData } = require('../utils/validation');

async function handlecreateuser(req, res) {
    try {
        let { email, password, username } = req.body;

        // Validate user data
        const validation = validateSignupData({ email, password, username });
        if (!validation.isValid) {
            return res.status(400).json({ message: validation.message });
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
