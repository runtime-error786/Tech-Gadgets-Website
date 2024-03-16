const express = require('express');
const AdminCount = express.Router();
const bodyParser = require('body-parser');
const { MYSQL } = require("../Mysql");
const { Checkvalid } = require("../Middleware/Auth");
const cookieParser = require('cookie-parser');

AdminCount.use(bodyParser.json());
AdminCount.use(cookieParser());

AdminCount.get('/', Checkvalid, async (req, res) => {
    try {
        console.log("admincounr")
        const query = "SELECT COUNT(*) AS adminCount FROM users WHERE role = 'Admin'";
        MYSQL.query(query, (err, result) => {
            if (err) {
                console.error('Error querying admin count:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                const adminCount = result[0].adminCount;
                res.status(200).json({ adminCount });
            }
        });
    } catch (error) {
        console.error('Error getting admin count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = AdminCount;
