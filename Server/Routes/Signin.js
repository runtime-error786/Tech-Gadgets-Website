const express = require('express');
const signin = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MYSQL } = require("../Models/dbconfig");
let {handleEmail} = require("../Middleware/Signinemail");

signin.use(bodyParser.json());
signin.use(cookieParser());



signin.post('/', async (req, res) => {

    console.log(req.body)
    const { email, password } = req.body;
    const getUserQuery = `
        SELECT * FROM users WHERE email = ?;
    `;

    MYSQL.query(getUserQuery, [email], async (err, result) => {
        if (err) {
            console.error('Error retrieving user data:', err);
            return res.status(500).send('Error retrieving user data');
        }

        if (result.length === 0) {
            return res.status(404).send('User not found');
        }

        const user = result[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send('Incorrect password');
        }

        const token = jwt.sign({ userId: user.email }, "0123456789", { expiresIn: '1h' });

        
        const insertTokenQuery = `
INSERT INTO tokens (email, token) VALUES (?, ?);
`;
        MYSQL.query(insertTokenQuery, [user.email, token], (tokenErr) => {
            if (tokenErr) {
                console.error('Error inserting token into database:', tokenErr);
                return res.status(500).send('Error inserting token into database');
            }
            handleEmail(req,res);
            res.cookie('Eshop', token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 3600000 }); // Expires in 1 hour (3600000 milliseconds)

            console.log(res.getHeaders()); // Output response headers

            res.status(200).json({ message: 'Sign in successful', user });
        });

    });
});


module.exports = signin;
