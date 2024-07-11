
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8080;
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


mongoose.connect(process.env.MONGO_URL, {});
console.log('MongoDB Connected');
app.use(express.json());
app.use('/', routes);

// The "catchall" handler: for any request that doesn't match any route, send back the React index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
