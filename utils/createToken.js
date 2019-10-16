/*
ANTES

const config = require('./config/default')
const jwt = require('jsonwebtoken');

const token = jwt.sign(
    { id },
    config.secret,
    { expiresIn: 300 }
);

*/

const jwt = require('jsonwebtoken');
const { secret } = require('../config/default');

module.exports = (data, expiresIn = 300) =>
    jwt.sign(
        data,
        secret,
        { expiresIn }
    );