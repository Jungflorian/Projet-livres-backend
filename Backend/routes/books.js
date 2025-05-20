const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config');
const stuffCtrl = require('../controllers/books');

router.post('/', multer, stuffCtrl.createBook);
router.delete('/:id',stuffCtrl.deleteBook);
router.put('/:id', stuffCtrl.updateBook);
router.get('/:id', stuffCtrl.getOneBook);
router.get('/', stuffCtrl.getAllBooks);

module.exports = router;