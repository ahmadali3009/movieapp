let express = require('express');
let topmovierouter = express.Router();
const handletopmoviedetails = require('../controller/handletopmoviedetails');
topmovierouter.get("/top-detail", handletopmoviedetails);

module.exports = topmovierouter;