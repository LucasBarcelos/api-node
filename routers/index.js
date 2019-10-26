const express = require('express');
const verifyToken = require('../middlewares/verifyToken');

// Rotas
const users = require('./users');

// Instância do router
const router =  express.Router();

// Rotas base
router.use('/users', verifyToken, users);

// Expõe as rotas
module.exports = router;