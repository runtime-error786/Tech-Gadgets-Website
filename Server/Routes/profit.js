// Import required modules
const express = require('express');
const profit = express.Router();
const { MYSQL } = require("../Models/dbconfig");
const { Checkvalid } = require("../Middleware/Auth");

// Define route to fetch sum of prices from 'profit' table
profit.get('/', Checkvalid, async (req, res) => {
    // Query to fetch sum of prices
    MYSQL.query('SELECT SUM(price) AS totalProfit FROM profit', (err, result) => {
        if (err) {
            console.error('Error fetching sum of prices:', err);
            res.status(500).send('Internal Server Error');
        } else {
            // Send the sum of prices as the response
            res.json({ totalProfit: result[0].totalProfit });
        }
    });
});

module.exports = profit;
