const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { csrfProtection } = require('../server')

router.get('/register', userController.registerPage)

router.get('/login', userController.loginPage)

router.post('/register', csrfProtection, userController.register);

router.post('/login', csrfProtection, userController.login);

router.get('/logout', userController.logout)

module.exports = router;