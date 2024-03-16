const express = require('express');
const CustomerCount = express.Router();
const bodyParser = require('body-parser');
const { MYSQL } = require("../Mysql");
const { Checkvalid } = require("../Middleware/Auth");
const cookieParser = require('cookie-parser');

CustomerCount.use(bodyParser.json());
CustomerCount.use(cookieParser());

CustomerCount.get('/', Checkvalid, async (req, res) => {
    try {
        const query = "SELECT COUNT(*) AS customerCount FROM users WHERE role = 'Customer'";
        MYSQL.query(query, (err, result) => {
            if (err) {
                console.error('Error querying customer count:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                const customerCount = result[0].customerCount;
                res.status(200).json({ customerCount });
            }
        });
    } catch (error) {
        console.error('Error getting customer count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = CustomerCount;
