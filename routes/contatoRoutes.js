const express = require('express');
const router = express.Router();
const contatoController = require('../controller/contatoController');
const { isAuthenticated } = require('../middleware/auth');


router.get('/contato', isAuthenticated, contatoController.contatoIndex)

module.exports = router;
