// Import Express.js
const express = require('express');

// Import Node.js package 'path' to resolve path of files that are located on the server.
const api = require('./routes/index');

// Initialize an instance of Express.js
const app = express();

// Specify on wich port the Express.js server will run 
const PORT = 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static middleware pointing to the public folder
app.use(express.static('public'));

// Create Express.js routes 
app.use('/api', api);