const express = require('express');
const UpdateProduct = express.Router();
const bodyParser = require('body-parser');
const { MYSQL } = require("../Mysql");
const { Checkvalid } = require("../Middleware/Auth");

UpdateProduct.use(bodyParser.json());

UpdateProduct.put('/', Checkvalid, async (req, res) => {
    try {
        const { id, name, company, quantity, price, description, category } = req.body;

        const checkQuery = `
            SELECT id FROM products 
            WHERE name = ? AND category = ? AND company = ? AND price = ?
        `;
        
        MYSQL.query(checkQuery, [name, category, company, price], (checkErr, checkResult) => {
            if (checkErr) {
                console.error('Error checking product:', checkErr);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (checkResult.length > 0) {
                // Product with same name, category, company, and price already exists
                console.log('Product with same name, category, company, and price already exists. No update performed.');
                return res.status(400).json({ message: 'Product with same name, category, company, and price already exists. No update performed.' });
            }

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
                    return res.status(500).json({ message: 'Internal server error' });
                }
                console.log('Product updated successfully');
                res.status(200).json({ message: 'Product updated successfully' });
            });
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = UpdateProduct;
