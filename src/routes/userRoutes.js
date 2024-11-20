const express = require('express');
const userController = require('../controllers/userController');
const validate = require('../middlewares/validate');
const validators = require('../utils/validators');

const router = express.Router();

router.post('/register', validate(validators.userRegister), userController.register);
router.post('/login', userController.login);

module.exports = router;