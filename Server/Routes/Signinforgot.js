const express = require('express');
const signinforgot = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MYSQL } = require("../Models/dbconfig");
let { handleEmail } = require("../Middleware/forgotmail");

signinforgot.use(bodyParser.json());
signinforgot.use(cookieParser());

signinforgot.put('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        handleEmail(req,res);
        const updateQuery = `UPDATE users SET password = ? WHERE email = ?`;
        MYSQL.query(updateQuery, [hashedPassword, email], (err, result) => {
            if (err) {
                console.error("Error updating user's password:", err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ error: "User not found" });
                return;
            }
            res.json({ message: "Password updated successfully" });
        });
    } catch (error) {
        console.error("Error handling password update:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = signinforgot;
