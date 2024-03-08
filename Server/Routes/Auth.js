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
   try {
      const googleToken = req.cookies.GEshop; 
      const customToken = req.cookies.Eshop; 

      let userEmail;

      if (googleToken) {
         console.log("hello1");
         const decoded = jwt.decode(googleToken,{ complete: true });
         userEmail = decoded.payload.email;
      } 
      else if (customToken) {
         console.log("hello2");
         const decoded = jwt.verify(customToken, '0123456789');
         userEmail = decoded.userId;
      } else if(googleToken!=null || customToken!=null) {
         console.log("hello3");
         return res.status(401).send("JWT token not provided");
      }

      MYSQL.query('SELECT * FROM users WHERE email = ?', [userEmail], (err, result) => {
         if (err) {
            console.error('Error querying database:', err);
            res.status(500).send("Error querying database");
         } else {
            if (result.length > 0) {
               const userRole = result[0].role;
               console.log(userRole);
               res.send(`${userRole}`);
            }
         }
      });
   } catch (e) {
      console.error("Error:", e);
      res.status(500).send("Error decoding JWT token");
   }
});


module.exports = Auth;
