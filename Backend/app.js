require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user');

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => {
    console.log('Connexion à MongoDB échouée !');
    console.error(error);
  });

  app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get('/', (req, res) => {
    res.status(200).send('API is running');
});

app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);
app.use('images', express.static(path.join(__dirname, 'images')));

module.exports = app;