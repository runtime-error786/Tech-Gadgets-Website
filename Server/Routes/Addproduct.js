const express = require('express');
const Addproduct = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { MYSQL } = require("../Mysql");
let {Checkvalid} = require("../Middleware/Auth");

Addproduct.use(bodyParser.json());

let {storage} = require("../Config/multer");

const upload = multer({ storage: storage });

Addproduct.post('/',Checkvalid, upload.single('image'), async (req, res) => {
    try {
        const { name, company, price, description, category,qty } = req.body;
        console.log("hello i am add product",qty)
        const imagepath = req.file ? req.file.path : ''; 

        
        const checkExistingQuery = 'SELECT * FROM products WHERE name = ? AND company = ? AND price = ?';
        MYSQL.query(checkExistingQuery, [name, company, price], async (error, results) => {
            if (error) {
                console.error('Error checking existing product:', error);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            
            if (results.length === 0) {
                const insertProductQuery = 'INSERT INTO products (name, company, price, description, category, imagepath,quantity) VALUES (?, ?, ?, ?, ?, ? , ?)';
                MYSQL.query(insertProductQuery, [name, company, price, description, category, imagepath,qty], (err, result) => {
                    if (err) {
                        console.error('Error inserting product data:', err);
                        res.status(500).json({ error: 'Internal server error' });
                        return;
                    }
                    console.log('Product added successfully');
                    res.status(200).json({ message: 'Product added successfully' });
                });
            } else {
                res.status(400).json({ error: 'Product already exists' });
            }
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = Addproduct;
