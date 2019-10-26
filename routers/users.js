const express = require('express');
const router = express.Router();

// Controller
const Users = require('../controllers/Users');

router.get('/:id', Users.get);
router.put('/:id', Users.update);
router.delete('/:id', Users.delete);

module.exports = router;