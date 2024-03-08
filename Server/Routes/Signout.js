const express = require('express');
const Out = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MYSQL } = require("../Mysql");

Out.use(bodyParser.json());
Out.use(cookieParser());

Out.get('/', async (req, res) => {
    res.clearCookie('Eshop');
    res.clearCookie('GEshop');
    res.send('deleted');
});

module.exports = Out;
