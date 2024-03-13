const express = require('express');
const Show = express.Router();
const { MYSQL } = require("../Mysql");
let {Checkvalid} = require("../Middleware/Auth");

Show.get('/',Checkvalid, async (req, res) => {
    try {
        const search = req.query.search; 
        const sort = req.query.sort === 'true' ? 'ASC' : 'DESC';

        const query = `SELECT id, name, email, role FROM users WHERE role = 'Admin' AND LOWER(name) LIKE LOWER('%${search}%') ORDER BY name ${sort}`;

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
