const express = require('express');
const app = express();
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');

app.use(express.json());

mongoose.connect('mongodb+srv://florianjung:w3sqjKjG1XhcI7JS@cluster0.o4c5ll6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => {
    console.log('Connexion à MongoDB échouée !');
    console.error(error);
  });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/stuff', stuffRoutes);

module.exports = app;