const express = require('express');
const ShowCart = express.Router();
const { MYSQL } = require("../Mysql");
const { Checkvalid } = require("../Middleware/Auth");

ShowCart.get('/', Checkvalid, async (req, res) => {
    try {
        console.log("cart show api call");
        const userEmail = req.userEmail;
        const query = `
            SELECT p.name AS product_name, p.price, c.quantity AS cart_qty, p.quantity AS original_qty
            FROM cart c
            INNER JOIN products p ON c.product_id = p.id
            WHERE c.user_email = ?;
        `;
        MYSQL.query(query, [userEmail], (err, results) => {
            if (err) {
                console.error('Error retrieving cart items:', err);
                return res.status(500).json({ error: 'Error retrieving cart items' });
            }
            res.status(200).json({ cartItems: results });
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = ShowCart;
