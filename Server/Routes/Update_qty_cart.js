const express = require('express');
const Update_cart = express.Router();
const { MYSQL } = require("../Models/dbconfig");
const { Checkvalid } = require("../Middleware/Auth");

Update_cart.put('/', Checkvalid, async (req, res) => {
    try {
        const { productId, qty } = req.body;
        const userEmail = req.userEmail;

        
        const query = `
            UPDATE cart
            SET quantity = ?
            WHERE user_email = ? AND product_id = ?
        `;
        
        MYSQL.query(query, [qty, userEmail, productId], (err, result) => {
            if (err) {
                console.error('Error updating cart item:', err);
                return res.status(500).json({ error: 'Error updating cart item' });
            }
            res.status(200).json({ message: 'Cart item updated successfully' });
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = Update_cart;
