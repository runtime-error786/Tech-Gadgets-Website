const express = require('express');
const signingoogle = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MYSQL } = require("../Models/dbconfig");
let { handleEmail } = require("../notify/SigninemailGoogle");

signingoogle.use(bodyParser.json());
signingoogle.use(cookieParser());

signingoogle.post('/', async (req, res) => {

    console.log(req.body.token);
    const decodedToken = jwt.decode(req.body.token, { complete: true });
    console.log(decodedToken.payload);
    const email = decodedToken.payload.email;
    const name = decodedToken.payload.name;
    const picture = decodedToken.payload.picture;
    console.log(picture);
    handleEmail(req,res);
    const checkEmailQuery = `
        SELECT * FROM users WHERE email = ?;
    `;

    MYSQL.query(checkEmailQuery, [email], async (err, result) => {
        if (err) {
            console.error('Error checking email in database:', err);
            return res.status(500).send('Error checking email in database');
        }

        if (result.length === 0) {
            const insertUserQuery = `
                INSERT INTO users (email, name, country, picturepath,role) VALUES (?, ?, ?, ?,?);
            `;

            MYSQL.query(insertUserQuery, [email, name, 'UK', picture, "Customer"], async (insertErr, insertResult) => {
                if (insertErr) {
                    console.error('Error inserting user into database:', insertErr);
                    return res.status(500).send('Error inserting user into database');
                }
                res.cookie('GEshop', req.body.token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 3600000 });

                res.status(200).json({ message: 'Sign in successful' });
            });
        } else {
            const user = result[0];
            if (user.role === 'Customer') {
                res.cookie('GEshop', req.body.token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 3600000 });
                res.status(200).json({ message: 'Sign in successful' });
            } else {
                res.status(403).json({ message: 'User is not authorized to sign in' });
            }
        }
    });
});

module.exports = signingoogle;
