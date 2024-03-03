const express = require('express');
const signup = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {MYSQL} = require("../Mysql");
const bodyParser = require('body-parser');
let bcrypt = require('bcrypt');

signup.use(bodyParser.json());

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

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        picturepath VARCHAR(255),
        wallet INT DEFAULT 0
    )
`;

MYSQL.query(createTableQuery, (err, result) => {
    if (err) {
        console.error('Error creating users table:', err);
    } else {
        console.log('Users table created successfully');
    }
});

signup.post('/', upload.single('file'), (req, res) => {
    let { name, email, country, password } = req.body;
    const picturepath = req.file ? req.file.path : null;
    let hash = bcrypt.hashSync(password, 10); 
    // Check if email already exists in the database
    const checkEmailQuery = `
        SELECT * FROM users WHERE email = ?;
    `;

    MYSQL.query(checkEmailQuery, [email], (checkErr, checkResult) => {
        if (checkErr) {
            console.error('Error checking email in database:', checkErr);
            return res.status(500).send('Error checking email in database');
        }

        if (checkResult.length > 0) {
            // Email already exists, return error response
            console.log("email exist");
            return res.status(400).send('Email already registered');
        }

        // Email does not exist, proceed with inserting the user
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
