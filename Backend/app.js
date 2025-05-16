const express = require('express');
const app = express();
const mongoose = require('mongoose');

const Books = require('./models/books');

app.use(express.json());

mongoose.connect('mongodb+srv://jungflorian:oxMxKXPlyL1dRjER@cluster0.wayfy7d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // ou remplacez * par 'http://localhost:3001' pour plus de sécurité
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post("api/books", (req, res, next) => {
    this.delete.body._id;

    const book = new Books({
        ...req.body
    });
    book.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
});

app.delete('/api/books/:id', (req, res, next) => {
    Books.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
});

app.put('/api/books/:id', (req, res, next) => {
    Books.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
});

app.get('/api/books/:id', (req, res, next) => {
    Books.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
});

app.get('/api/books', (req, res, next) => {
    Books.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
});

module.exports = app;