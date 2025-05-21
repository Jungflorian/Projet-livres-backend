const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config');
const stuffCtrl = require('../controllers/books');

router.post('/', auth,multer, stuffCtrl.createBook);
router.delete('/:id',auth,stuffCtrl.deleteBook);
router.put('/:id',auth, multer, stuffCtrl.updateBook);
router.get('/:id', stuffCtrl.getOneBook);
router.get('/',auth,stuffCtrl.getAllBooks);

module.exports = router;