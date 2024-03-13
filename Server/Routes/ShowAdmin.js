const express = require('express');
const Show = express.Router();
const { MYSQL } = require("../Mysql");

Show.get('/', async (req, res) => {
    try {
        console.log("hello i am show")
        MYSQL.query(`SELECT id, name, email, role FROM users WHERE role = 'Admin'`, (err, results) => {
            if (err) {
                console.error("Error fetching users with admin roles:", err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            res.json(results);
        });
    } catch (error) {
        console.error("Error fetching users with admin roles:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = Show;
