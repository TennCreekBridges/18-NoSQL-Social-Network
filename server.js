// dependencies
const express = require('express');
const mongoose = require('mongoose');

// routing
const routes = require('./routes');

// express & port
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// hook db to mongoose
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/social-muckwork'
);

// Use this to log mongo queries being executed
mongoose.set('debug', true);

// port listening
app.listen(PORT, () => console.log(`Status: 🤘 @ localhost:${PORT}`));
