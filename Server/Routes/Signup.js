const express = require('express');
const signup = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {MYSQL} = require("../Mysql");
const bodyParser = require('body-parser');
let bcrypt = require('bcrypt');
let {handleEmailMiddleware} = require("../Middleware/Signupemail");

signup.use(bodyParser.json());

let {storage} = require("../Config/multer");

const upload = multer({ storage: storage });


signup.post('/',upload.single('file'),handleEmailMiddleware, (req, res) => {
    let { name, email, country, password } = req.body;
    country = country.toLowerCase();
    const picturepath = req.file ? req.file.path : null;
    let hash = bcrypt.hashSync(password, 10); 
    const checkEmailQuery = `
        SELECT * FROM users WHERE email = ?;
    `;

    MYSQL.query(checkEmailQuery, [email], (checkErr, checkResult) => {
        if (checkErr) {
            console.error('Error checking email in database:', checkErr);
            return res.status(500).send('Error checking email in database');
        }

        if (checkResult.length > 0) {
            console.log("email exist");
            return res.status(400).send('Email already registered');
        }

        const insertUserQuery = `
            INSERT INTO users (name, email, country, password, picturepath) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [name, email, country, hash, picturepath];

        MYSQL.query(insertUserQuery, values, (insertErr, insertResult) => {
            if (!insertErr) {
                console.log('User inserted into database');
                res.status(200).send('User inserted into database');
              
            } else {
                console.error('Error inserting user into database:', insertErr);
                res.status(500).send('Error inserting user into database');
            }
        });
    });
});

module.exports = signup;
