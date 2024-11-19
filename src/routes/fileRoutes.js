const express = require('express');
const fileController = require('../controllers/fileController');

const router = express.Router();

router.post('/', fileController.create);
router.get('/:id', fileController.getById);
router.put('/:id', fileController.update);
router.delete('/:id', fileController.delete);

module.exports = router;
