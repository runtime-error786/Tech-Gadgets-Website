const express = require('express');
const signingoogle = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MYSQL } = require("../Mysql");

signingoogle.use(bodyParser.json());
signingoogle.use(cookieParser());


signingoogle.post('/', async (req, res) => {

    console.log(req.body);
    const { email, name, picture } = req.body;
    // Check if the email exists in the users table
    const checkEmailQuery = `
        SELECT * FROM users WHERE email = ?;
    `;

    MYSQL.query(checkEmailQuery, [email], async (err, result) => {
        if (err) {
            console.error('Error checking email in database:', err);
            return res.status(500).send('Error checking email in database');
        }

        if (result.length === 0) {
            // Email does not exist, insert the user into the users table
            const insertUserQuery = `
                INSERT INTO users (email, name, country, picturepath) VALUES (?, ?, ?,?);
            `;

            MYSQL.query(insertUserQuery, [email, name, 'UK',picture], async (insertErr, insertResult) => {
                if (insertErr) {
                    console.error('Error inserting user into database:', insertErr);
                    return res.status(500).send('Error inserting user into database');
                }

                // User inserted successfully, generate JWT token
                const token = jwt.sign({ userId: insertResult.insertId }, "0123456789", { expiresIn: '1h' });

                // Store token in the tokens table
                const insertTokenQuery = `
                    INSERT INTO tokens (user_id, token) VALUES (?, ?);
                `;

                MYSQL.query(insertTokenQuery, [insertResult.insertId, token], (tokenErr) => {
                    if (tokenErr) {
                        console.error('Error inserting token into database:', tokenErr);
                        return res.status(500).send('Error inserting token into database');
                    }

                    // Set token as a cookie
                    res.cookie('Musu', token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 3600000 });

                    res.status(200).json({ message: 'Sign in successful' });
                });
            });
        } else {
            // Email exists, generate JWT token for the user
            const user = result[0];
            const token = jwt.sign({ userId: user.id }, "0123456789", { expiresIn: '1h' });

            // Store token in the tokens table
            const insertTokenQuery = `
                INSERT INTO tokens (user_id, token) VALUES (?, ?);
            `;

            MYSQL.query(insertTokenQuery, [user.id, token], (tokenErr) => {
                if (tokenErr) {
                    console.error('Error inserting token into database:', tokenErr);
                    return res.status(500).send('Error inserting token into database');
                }

                // Set token as a cookie
                res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 3600000 });

                res.status(200).json({ message: 'Sign in successful' });
            });
        }
    });
});

module.exports = signingoogle;
