const express = require('express');
const signingoogle = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MYSQL } = require("../Mysql");
let {handleEmailMiddleware} = require("../Middleware/SigninemailGoogle");

signingoogle.use(bodyParser.json());
signingoogle.use(cookieParser());

signingoogle.post('/',handleEmailMiddleware, async (req, res) => {

    console.log(req.body.token);
    const decodedToken = jwt.decode(req.body.token, { complete: true });
    console.log(decodedToken.payload);
    const email = decodedToken.payload.email;
    const name = decodedToken.payload.name;
    const picture = decodedToken.payload.picture;
    console.log(picture);
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
                INSERT INTO users (email, name, country, picturepath) VALUES (?, ?, ?, ?);
            `;

            MYSQL.query(insertUserQuery, [email, name, 'UK', picture], async (insertErr, insertResult) => {
                if (insertErr) {
                    console.error('Error inserting user into database:', insertErr);
                    return res.status(500).send('Error inserting user into database');
                }
                res.cookie('GEshop', req.body.token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 3600000 });

                res.status(200).json({ message: 'Sign in successful' });
            });
        } else {
            res.cookie('GEshop', req.body.token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 3600000 });

            res.status(200).json({ message: 'Sign in successful' });
        }
    });
});

module.exports = signingoogle;
