const Books = require('../models/books');
const fs = require('fs');

exports.createBook = (req, res, next) => {
    let bookData = req.body;
    if (req.body.book) {
        bookData = JSON.parse(req.body.book);
    }
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        bookData.imageUrl = url + '/images/' + req.file.filename;
    } else if (!bookData.imageUrl) {
        // bookData.imageUrl = 'https://via.placeholder.com/206x260';
    }
    const book = new Books(bookData);
    book.save()
        .then(() => res.status(201).json({ message: 'Livre enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteBook = (req, res, next) => {
    Books.findOne({ _id: req.params.id })
        .then(book => {
            if (!book) {
                return res.status(404).json({ message: 'Livre non trouvé !' });
            }
            const filename = book.imageUrl ? book.imageUrl.split('/images/')[1] : null;
            if (filename) {
                fs.unlink('images/' + filename, (err) => {
                    Books.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Livre et image supprimés !' }))
                        .catch(error => res.status(400).json({ error }));
                });
            } else {
                Books.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Livre supprimé (pas d\'image) !' }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
}

exports.updateBook = (req, res, next) => {
    Books.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Livre modifié !' }))
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
            res.status(200).json(books);
        })
        .catch(error => res.status(400).json({ error }));
}

exports.getBestRatedBooks = (req, res, next) => {
    Books.find()
        .sort({ averageRating: -1 })
        .limit(3)
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};

exports.rateBook = (req, res, next) => {
    const userId = req.body.userId;
    const grade = parseInt(req.body.rating, 10);

    Books.findOne({ _id: req.params.id })
        .then(book => {
            if (!book) {
                return res.status(404).json({ message: 'Livre non trouvé !' });
            }
            const existingRating = book.ratings.find(r => r.userId === userId);
            if (existingRating) {
                existingRating.grade = grade;
            } else {
                book.ratings.push({ userId, grade });
            }
            book.averageRating = (
                book.ratings.reduce((sum, r) => sum + r.grade, 0) / book.ratings.length
            );
            book.save()
                .then(updatedBook => res.status(200).json(updatedBook))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};