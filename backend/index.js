const express = require('express');
const server = express();
const cors = require('cors');
const axios = require('axios');
const Port = 5000;
// Middleware
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// Test route
server.get('/api/test', (req, res) => {  res.json({ message: 'Server is running!' });
});

server.listen(Port, () => {
  console.log(`Server running at http://localhost:${Port}`);
});
