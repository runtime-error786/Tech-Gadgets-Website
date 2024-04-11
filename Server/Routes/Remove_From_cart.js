const express = require('express');
const Removecart = express.Router();
const { MYSQL } = require("../Models/dbconfig");
const { Checkvalid } = require("../Middleware/Auth");

Removecart.delete('/', Checkvalid, async (req, res) => {
    try {
        console.log(req.body)
        const { productId } = req.body;
        const userEmail = req.userEmail;

        const query = `
            DELETE FROM cart
            WHERE user_email = ? AND product_id = ?
        `;
        
        MYSQL.query(query, [userEmail, productId], (err, result) => {
            if (err) {
                console.error('Error deleting product from cart:', err);
                return res.status(500).json({ error: 'Error deleting product from cart' });
            }
            res.status(200).json({ message: 'Product deleted from cart successfully' });
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = Removecart;
