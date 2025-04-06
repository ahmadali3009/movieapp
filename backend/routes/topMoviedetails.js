let express = require('express');
let topmovierouter = express.Router();
let authmiddleware = require('../middleware/authmiddleware');
topmovierouter.post("/top-detail", authmiddleware, (req, res) => {
    res.json({ message: "top detail" });
});

module.exports = topmovierouter;