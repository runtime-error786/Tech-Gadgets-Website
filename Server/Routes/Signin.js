const express = require('express');
const signin = express.Router();
const MYSQL = require("../Mysql");

signin.get('/', (req, res) => {
    res.send('Hello and world!');
});

module.exports = signin;
