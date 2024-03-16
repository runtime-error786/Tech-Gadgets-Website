const express = require('express');
const UpdateProduct = express.Router();
const bodyParser = require('body-parser');
const { MYSQL } = require("../Mysql");
const { Checkvalid } = require("../Middleware/Auth");

UpdateProduct.use(bodyParser.json());

UpdateProduct.put('/', Checkvalid, async (req, res) => {
    try {
        const { id, name, company, quantity, price, description, category } = req.body;

        const sql = `
            UPDATE products 
            SET 
                name = ?,
                company = ?,
                quantity = ?,
                price = ?,
                description = ?,
                category = ?
            WHERE id = ?
        `;
        MYSQL.query(sql, [name, company, quantity, price, description, category, id], (err, result) => {
            if (err) {
                console.error('Error updating product:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Product updated successfully');
                res.status(200).json({ message: 'Product updated successfully' });
            }
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = UpdateProduct;
