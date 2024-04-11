const express = require('express');
const Cart_Count = express.Router();
const { MYSQL } = require("../Models/dbconfig");
const { Checkvalid } = require("../Middleware/Auth");

Cart_Count.get('/', Checkvalid, async (req, res) => {
    try {
        const userEmail = req.userEmail;
        const query = `
            SELECT COUNT(*) AS cartCount
            FROM cart
            WHERE user_email = ?;
        `;
        MYSQL.query(query, [userEmail], (err, results) => {
            if (err) {
                console.error('Error retrieving cart count:', err);
                return res.status(500).json({ error: 'Error retrieving cart count' });
            }
            const cartCount = results[0].cartCount;
            res.status(200).json({ cartCount });
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = Cart_Count;
