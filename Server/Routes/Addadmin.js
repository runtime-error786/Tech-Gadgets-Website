const express = require('express');
const Addamin = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MYSQL } = require("../Mysql");
let {Checkvalid} = require("../Middleware/Auth");

Addamin.use(bodyParser.json());
Addamin.use(cookieParser());

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const uploadDir = './uploads';
        fs.mkdirSync(uploadDir, { recursive: true });
        callback(null, uploadDir);
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

Addamin.post('/',Checkvalid, upload.single('image'), async (req, res) => {
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
                res.status(200).json({ message: 'Admin added successfully' });
            });
        });
    } catch (error) {
        console.error('Error adding admin:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = Addamin;
