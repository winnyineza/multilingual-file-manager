const express = require('express');
const fileController = require('../controllers/fileController');
const authMiddleware = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const validators = require('../utils/validators');

const router = express.Router();

// Protect all file routes with authentication
router.use(authMiddleware);

router.post('/', validate(validators.fileCreate), fileController.create);
router.get('/:id', fileController.getById);
router.put('/:id', fileController.update);
router.delete('/:id', fileController.delete);

module.exports = router;
