const express = require('express');
const UpdateProduct = express.Router();
const bodyParser = require('body-parser');
const { MYSQL } = require("../Mysql");
const { Checkvalid } = require("../Middleware/Auth");
const nodemailer = require('nodemailer');
let {transporter} = require("../Config/Transporter");
UpdateProduct.use(bodyParser.json());

UpdateProduct.put('/', Checkvalid, async (req, res) => {
    try {
        const { id, name, company, quantity: newQuantity, price, description, category } = req.body;

        const checkQuery = `
            SELECT id FROM products 
            WHERE LOWER(name) = LOWER(?) AND LOWER(category) = LOWER(?) AND LOWER(company) = LOWER(?) AND price = ? AND id != ?
        `;
        
        MYSQL.query(checkQuery, [name, category, company, price, id], (checkErr, checkResult) => {
            if (checkErr) {
                console.error('Error checking product:', checkErr);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (checkResult.length > 0) {
                console.log('Product with same name, category, company, and price already exists. No update performed.');
                return res.status(400).json({ message: 'Product with same name, category, company, and price already exists. No update performed.' });
            }

            const fetchQuantityQuery = `
                SELECT quantity FROM products WHERE id = ?
            `;

            MYSQL.query(fetchQuantityQuery, [id], async (fetchErr, fetchResult) => {
                if (fetchErr) {
                    console.error('Error fetching current quantity:', fetchErr);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                if (fetchResult.length === 0) {
                    console.error('Product not found with ID:', id);
                    return res.status(400).json({ message: 'Product not found' });
                }

                const oldQuantity = fetchResult[0].quantity;

                if (newQuantity > oldQuantity) {
                    const cartQuery = `
                        SELECT u.id, u.email, c.quantity
                        FROM cart c
                        INNER JOIN users u ON c.user_email = u.email
                        WHERE c.product_id = ?
                    `;

                    MYSQL.query(cartQuery, [id], async (cartErr, cartResult) => {
                        if (cartErr) {
                            console.error('Error checking user carts:', cartErr);
                            return res.status(500).json({ message: 'Internal server error' });
                        }


                        for (const cartItem of cartResult) {
                            const { user_id, email, quantity } = cartItem;
                            console.log(email,quantity,newQuantity)
                            if (newQuantity > quantity) {
                                try {
                                    await transporter.sendMail({
                                        from: 'f219085@cfd.nu.edu.pk',
                                        to: email,
                                        subject: `Product ${name} in your cart has been updated!`,
                                        text: `The quantity of product ${name} in your cart is in stock.`
                                    });
                                } catch (emailError) {
                                    console.error('Error sending email to user:', emailError);
                                    // Handle email sending error
                                }
                            }
                            
                        }

                        const updateQuery = `
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
                        
                        MYSQL.query(updateQuery, [name, company, newQuantity, price, description, category, id], (updateErr, result) => {
                            if (updateErr) {
                                console.error('Error updating product:', updateErr);
                                return res.status(500).json({ message: 'Internal server error' });
                            }
                            console.log('Product updated successfully');
                            res.status(200).json({ message: 'Product updated successfully' });
                        });
                    });
                }
                else if (newQuantity < oldQuantity) {
                    const cartQuery = `
                        SELECT u.id, u.email, c.quantity
                        FROM cart c
                        INNER JOIN users u ON c.user_email = u.email
                        WHERE c.product_id = ?
                    `;

                    MYSQL.query(cartQuery, [id], async (cartErr, cartResult) => {
                        if (cartErr) {
                            console.error('Error checking user carts:', cartErr);
                            return res.status(500).json({ message: 'Internal server error' });
                        }


                        for (const cartItem of cartResult) {
                            const { user_id, email, quantity } = cartItem;
                            console.log(email,quantity,newQuantity)
                            if (newQuantity < quantity) {
                                try {
                                    await transporter.sendMail({
                                        from: 'f219085@cfd.nu.edu.pk',
                                        to: email,
                                        subject: `Product ${name} in your cart has been updated!`,
                                        text: `The quantity of product ${name} in your cart is out stock.`
                                    });
                                } catch (emailError) {
                                    console.error('Error sending email to user:', emailError);
                                    // Handle email sending error
                                }
                            }
                            
                        }

                        const updateQuery = `
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
                        
                        MYSQL.query(updateQuery, [name, company, newQuantity, price, description, category, id], (updateErr, result) => {
                            if (updateErr) {
                                console.error('Error updating product:', updateErr);
                                return res.status(500).json({ message: 'Internal server error' });
                            }
                            console.log('Product updated successfully');
                            res.status(200).json({ message: 'Product updated successfully' });
                        });
                    });
                } 
                else {
                    const updateQuery = `
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
                    
                    MYSQL.query(updateQuery, [name, company, newQuantity, price, description, category, id], (updateErr, result) => {
                        if (updateErr) {
                            console.error('Error updating product:', updateErr);
                            return res.status(500).json({ message: 'Internal server error' });
                        }
                        console.log('Product updated successfully');
                        res.status(200).json({ message: 'Product updated successfully' });
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = UpdateProduct;
