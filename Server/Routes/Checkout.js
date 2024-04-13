const express = require('express');
const Checkout = express.Router();
const { MYSQL } = require("../Models/dbconfig");
const { Checkvalid } = require("../Middleware/Auth");
let { transporter } = require("../Config/Transporter");
const stripe = require('stripe')('sk_test_51P0cjlP8GjJIjxDGImARCejVPE9OLerJ3u7UXMefovycp8Qv9Bmu3SpjI3QZ3BMuN6SumxxjM1wz8qgwHxiJ3f0c00gSSeHG7P');
let {sendAdminNotification} = require("../notify/Admin_notify");
let {checkOtherCartsForProduct} = require("../notify/check_other_carts");
let {sendProductOutOfStockEmail} = require("../notify/out_of_stock");
let {sendProductInCartEmail} = require("../notify/Send_product_in_cart");

// Your checkout endpoint
Checkout.post('/', Checkvalid, async (req, res) => {
    try {
        let lineItems = [];
        let totalBill = 0;

        const userEmail = req.userEmail;
        const cartQuery = `
            SELECT product_id, quantity
            FROM cart
            WHERE user_email = ?;
        `;
        MYSQL.query(cartQuery, [userEmail], async (err, cartItems) => {
            if (err) {
                console.error('Error retrieving cart items:', err);
                return res.status(500).json({ error: 'Error retrieving cart items' });
            }

            const promises = cartItems.map((cartItem) => {
                return new Promise((resolve, reject) => {
                    const { product_id, quantity } = cartItem;
                    const productQuery = `
                        SELECT id, name, quantity as availableQuantity, price
                        FROM products
                        WHERE id = ?;
                    `;
                    MYSQL.query(productQuery, [product_id], (err, product) => {
                        if (err) {
                            console.error('Error retrieving product details:', err);
                            reject(err);
                        } else {
                            const itemPrice = product[0].price;
                            totalBill += itemPrice * quantity;

                            const updatedQuantity = product[0].availableQuantity - quantity;

                            lineItems.push({
                                price_data: {
                                    currency: 'usd',
                                    product_data: {
                                        name: product[0].name,
                                    },
                                    unit_amount: (itemPrice) * 100,
                                },
                                quantity: quantity,
                            });

                            resolve();
                        }
                    });
                });
            });

            await Promise.all(promises);

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: 'http://localhost:3000/customer/cart?session_id={CHECKOUT_SESSION_ID}',
                cancel_url: 'http://localhost:3000/customer/cart',
            });
            console.log(session)
            res.status(200).json({ message: 'Checkout successful', sessionId: session.id });

        });
    } catch (error) {
        console.error('Error processing checkout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


Checkout.delete('/webhook', Checkvalid, async (req, res) => {

    try {
        const event = req.body;
        console.log(event);
        const userEmail = req.userEmail;
        console.log("webhook");
        let totalBill = 0;
        const session = await stripe.checkout.sessions.retrieve(event.sessionId.toString());


        if (session.status == "complete" && session.payment_status == "paid") {
            const cartQuery = `
            SELECT product_id, quantity
            FROM cart
            WHERE user_email = ?;
        `;
            MYSQL.query(cartQuery, [userEmail], async (err, cartItems) => {
                if (err) {
                    console.error('Error retrieving cart items:', err);
                    return res.status(500).json({ error: 'Error retrieving cart items' });
                }


                const promises = cartItems.map((cartItem) => {
                    return new Promise((resolve, reject) => {
                        const { product_id, quantity } = cartItem;
                        const productQuery = `
                        SELECT id, name, quantity as availableQuantity, price
                        FROM products
                        WHERE id = ?;
                    `;
                        MYSQL.query(productQuery, [product_id], (err, product) => {
                            if (err) {
                                console.error('Error retrieving product details:', err);
                                reject(err);
                            } else {
                                const itemPrice = product[0].price;
                                totalBill += itemPrice * quantity;
                                console.log(itemPrice, totalBill);
                                const updatedQuantity = product[0].availableQuantity - quantity;
                                if (updatedQuantity === 0) {
                                    sendProductOutOfStockEmail(product[0].id, product[0].name);
                                }


                                const updateProductQuery = `
                                UPDATE products
                                SET quantity = ?
                                WHERE id = ?;
                            `;
                                MYSQL.query(updateProductQuery, [updatedQuantity, product_id], (err, result) => {
                                    if (err) {
                                        console.error('Error updating product quantity:', err);
                                        reject(err);
                                    } else {
                                        console.log(`Quantity updated for product ${product_id}`);
                                        resolve();
                                    }
                                });

                                // Check if other users have this product in their cart
                                checkOtherCartsForProduct(product_id, quantity, userEmail);
                            }
                        });
                    });
                });

                await Promise.all(promises);
                console.log(totalBill);

                // Insert total bill into profit table
                const insertProfitQuery = `
                    INSERT INTO profit (price)
                    VALUES (?);
                `;
                MYSQL.query(insertProfitQuery, [totalBill], (err, result) => {
                    if (err) {
                        console.error('Error inserting total bill into profit table:', err);
                    } else {
                        console.log(`Total bill inserted into profit table`);
                    }
                });
                
                // Send email with total bill
                const mailOptions = {
                    from: 'f219085@cfd.nu.edu.pk',
                    to: userEmail,
                    subject: 'Checkout Successful',
                    html: `<p>Your total bill is: ${totalBill}</p>
               <p>Good luck with your purchase!</p>`
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error sending email:', error);
                    } else {
                        console.log('Email sent:', info.response);
                    }
                });

                const deleteCartQuery = `
                    DELETE FROM cart
                    WHERE user_email = ?;
                `;
                MYSQL.query(deleteCartQuery, [userEmail], (err, result) => {
                    if (err) {
                        console.error('Error deleting cart items:', err);
                    } else {
                        console.log(`Deleted ${result.affectedRows} cart items for user ${userEmail}`);
                    }
                });

            })


            res.status(200).json({ error: ' payment received' });
        }
        else {
            res.status(500).json({ error: 'not payment received' });
        }
    } catch (error) {
        console.error('Error handling webhook event:', error);
        res.status(500).json({ error: 'not payment received' });
    }
});




module.exports = Checkout;
