const Books = require('../models/books');

exports.createBook = (req, res, next) => {
    let bookData = req.body;
    if (req.body.book) {
        bookData = JSON.parse(req.body.book);
    }
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        bookData.imageUrl = url + '/images/' + req.file.filename;
    } else if (!bookData.imageUrl) {
        bookData.imageUrl = 'https://via.placeholder.com/206x260';
    }
    const book = new Books(bookData);
    book.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteBook = (req, res, next) => {
    Books.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.updateBook = (req, res, next) => {
    Books.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneBook = (req, res, next) => {
    Books.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
}

exports.getAllBooks = (req, res, next) => {
    Books.find()
        .then(books => {
            console.log('getAllBooks');
            console.log(books);
            res.status(200).json(books);
        })
        .catch(error => res.status(400).json({ error }));
}