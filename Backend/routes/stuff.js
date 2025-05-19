const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

router.post('/',stuffCtrl.createBook);
router.delete('/:id',stuffCtrl.deleteBook);
router.put('/:id', stuffCtrl.updateBook);
router.get('/:id', stuffCtrl.getOneBook);
router.get('/', stuffCtrl.getAllBooks);

module.exports = router;