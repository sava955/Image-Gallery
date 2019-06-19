const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const postRoutes = require('./routes/posts');
const albumRoutes = require('./routes/albums');

const app = express();

mongoose.connect('mongodb+srv://gallery:mOEhjrZFcG7P4Ji5@cluster0-uh0fd.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
      console.log('Connected to database!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api/posts', postRoutes);
app.use('/api/albums', albumRoutes);

module.exports = app;