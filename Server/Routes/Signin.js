const express = require('express');
const signin = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MYSQL } = require("../Mysql");

signin.use(bodyParser.json());
signin.use(cookieParser());

const createTableQuery = `
CREATE TABLE IF NOT EXISTS tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    token VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
)
`;

MYSQL.query(createTableQuery, (err, result) => {
    if (err) {
        console.error('Error creating users table:', err);
    } else {
        console.log('Users table created successfully');
    }
});

signin.post('/', async (req, res) => {

    console.log(req.body)
    const { email, password } = req.body;
    // Query to fetch user data using email
    const getUserQuery = `
        SELECT * FROM users WHERE email = ?;
    `;

    MYSQL.query(getUserQuery, [email], async (err, result) => {
        if (err) {
            console.error('Error retrieving user data:', err);
            return res.status(500).send('Error retrieving user data');
        }

        if (result.length === 0) {
            // User with the provided email not found
            return res.status(404).send('User not found');
        }

        // User found, verify password
        const user = result[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            // Incorrect password
            return res.status(401).send('Incorrect password');
        }

        // Password is correct, generate JWT token
        const token = jwt.sign({ userId: user.id }, "0123456789", { expiresIn: '1h' });

        
        // Store token in token table
        const insertTokenQuery = `
INSERT INTO tokens (user_id, token) VALUES (?, ?);
`;
        MYSQL.query(insertTokenQuery, [user.id, token], (tokenErr) => {
            if (tokenErr) {
                console.error('Error inserting token into database:', tokenErr);
                return res.status(500).send('Error inserting token into database');
            }

            // Store token in cookie
            res.cookie('Musu', token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 3600000 }); // Expires in 1 hour (3600000 milliseconds)

            // Check response headers to verify if the cookie is set
            console.log(res.getHeaders()); // Output response headers

            // Return success message and user data
            res.status(200).json({ message: 'Sign in successful', user });
        });

    });
});

module.exports = signin;
