const express = require ('express');
const router = express.Router();
const indexController = require('../controller/indexController')
const contatoController = require('../controller/contatoController')

router.get ('/', indexController.renderIndex)

module.exports = router;