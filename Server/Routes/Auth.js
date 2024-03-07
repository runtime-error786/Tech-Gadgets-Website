const express = require('express');
const Auth = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MYSQL } = require("../Mysql");

Auth.use(bodyParser.json());
Auth.use(cookieParser());


Auth.get('/', async (req, res) => {
   try{
    console.log("hello auth")
   }
   catch(e)
   {

   }
});


module.exports = Auth;
