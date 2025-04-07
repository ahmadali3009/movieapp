let express = require('express');
let topmovierouter = express.Router();
let authmiddleware = require('../middleware/authmiddleware');
const handletopmoviedetails = require('../controller/handletopmoviedetails');
topmovierouter.post("/top-detail", authmiddleware, handletopmoviedetails);

module.exports = topmovierouter;