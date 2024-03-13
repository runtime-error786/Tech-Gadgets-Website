const express = require('express');
const Show = express.Router();
const { MYSQL } = require("../Mysql");

Show.get('/', async (req, res) => {
    try {
        const search = req.query.search; // Get the search string from query parameters

        // Construct the SQL query to filter users by role and name matching the search string
        const query = `SELECT id, name, email, role FROM users WHERE role = 'Admin' AND LOWER(name) LIKE LOWER('%${search}%')`;

        MYSQL.query(query, (err, results) => {
            if (err) {
                console.error("Error fetching users:", err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            res.json(results);
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = Show;
