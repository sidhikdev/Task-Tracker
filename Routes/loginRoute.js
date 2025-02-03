const express = require('express');
const router = express.Router();
const loginModule = require('../Controllers/loginController');
const { registerValidation, loginValidator } = require('../Middlewares/loginValidation');
const { authenticateUser } = require('../Middlewares/authMiddleware');

router.post('/register', registerValidation, loginModule.register)

router.post('/login', loginValidator, loginModule.login);

router.get('/refreshToken', loginModule.refreshToken);

router.get('/logout', authenticateUser, loginModule.logOut)

module.exports = router;