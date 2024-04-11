const express = require('express');
const CustomerCountByCountry = express.Router();
const bodyParser = require('body-parser');
const { MYSQL } = require("../Models/dbconfig");
const { Checkvalid } = require("../Middleware/Auth");
const cookieParser = require('cookie-parser');

CustomerCountByCountry.use(bodyParser.json());
CustomerCountByCountry.use(cookieParser());

CustomerCountByCountry.get('/', Checkvalid, async (req, res) => {
    try {
        const query = "SELECT country, COUNT(*) AS customerCount FROM users WHERE role = 'Customer' GROUP BY country";
        MYSQL.query(query, (err, result) => {
            if (err) {
                console.error('Error querying customer count by country:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                const customerCountByCountry = result.map(row => ({ country: row.country, customerCount: row.customerCount }));
                res.status(200).json(customerCountByCountry);
            }
        });
    } catch (error) {
        console.error('Error getting customer count by country:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = CustomerCountByCountry;
