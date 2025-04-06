const express = require('express');
const server = express();
const cors = require('cors');
const axios = require('axios');
const Port = 5000;
const connect = require('./connection');
const signuproute = require('./routes/signup');
const loginroute = require('./routes/login');
const topmovieroute = require('./routes/topMoviedetails');
const jwt = require('jsonwebtoken');

// Middleware
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// Test route
server.get('/api/test', (req, res) => {  res.json({ message: 'Server is running!' });
});
server.use('/api', signuproute);
server.use('/api', loginroute);
server.use('/api' , topmovieroute);

connect("mongodb://127.0.0.1:27017/moviedb");
server.listen(Port, () => {
  console.log(`Server running at http://localhost:${Port}`);
});
