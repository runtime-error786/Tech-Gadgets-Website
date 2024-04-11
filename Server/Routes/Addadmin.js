const express = require('express');
const Addamin = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MYSQL } = require("../Models/dbconfig");
let {Checkvalid} = require("../Middleware/Auth");
let {handleEmail} = require("../Middleware/Add_admin");
let {storage} = require("../Config/multer");

Addamin.use(bodyParser.json());
Addamin.use(cookieParser());



const upload = multer({ storage: storage });

Addamin.post('/',Checkvalid,upload.single('image'),  async (req, res) => {
    console.log("hello i am addadmin")
    try {
        const { name, email, country, password } = req.body;
        const picturePath = req.file ? req.file.path : ''; // If image is uploaded, store its path
        
        // Check if email already exists in the database
        const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
        MYSQL.query(checkEmailQuery, [email], async (error, results) => {
            if (error) {
                console.error('Error checking email:', error);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (results.length > 0) {
                res.status(400).json({ error: 'Email already exists' });
                return;
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new admin data into the database
            const insertAdminQuery = 'INSERT INTO users (name, email, country, password, picturepath, role) VALUES (?, ?, ?, ?, ?, ?)';
            MYSQL.query(insertAdminQuery, [name, email, country, hashedPassword, picturePath, 'Admin'], (err, result) => {
                if (err) {
                    console.error('Error inserting admin data:', err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }
                console.log('Admin added successfully');
                handleEmail(req,res);
                res.status(200).json({ message: 'Admin added successfully' });
            });
        });
    } catch (error) {
        console.error('Error adding admin:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = Addamin;
