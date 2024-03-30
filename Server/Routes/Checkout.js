const express = require('express');
const Checkout = express.Router();
const { MYSQL } = require("../Mysql");
const { Checkvalid } = require("../Middleware/Auth");
let { transporter } = require("../Config/Transporter");

Checkout.post('/', Checkvalid, async (req, res) => {
    try {
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

            let totalBill = 0;
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
                            checkOtherCartsForProduct(product_id, quantity,userEmail);
                        }
                    });
                });
            });

            await Promise.all(promises);

            // Delete cart items after updating product quantity
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

            res.status(200).json({ message: 'Checkout successful' });
        });
    } catch (error) {
        console.error('Error processing checkout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

function sendProductOutOfStockEmail(productId, productName) {
    const userQuery = `
    SELECT email
    FROM users
    WHERE role = 'admin';
`;

    MYSQL.query(userQuery, async (err, users) => {
        if (err) {
            console.error('Error retrieving user emails:', err);
        } else {
            const userEmails = users.map(user => user.email).join(', ');
            const mailOptions = {
                from: 'f219085@cfd.nu.edu.pk',
                to: userEmails,
                subject: 'Product Out of Stock',
                html: `<p>Product ${productName} is out of stock.</p>`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email to users:', error);
                } else {
                    console.log('Email sent to users:', info.response);
                }
            });
        }
    });
}

async function checkOtherCartsForProduct(productId, quantity1, userEmail) {
    const cartsQuery = `
        SELECT user_email, quantity
        FROM cart
        WHERE product_id = ? AND user_email <> ?;
    `;

    MYSQL.query(cartsQuery, [productId, userEmail], (err, carts) => {
        if (err) {
            console.error('Error retrieving carts for product:', err);
        } else {
            // Retrieve product name
            const productNameQuery = `
                SELECT name
                FROM products
                WHERE id = ?;
            `;

            MYSQL.query(productNameQuery, [productId], (err, productNameResult) => {
                if (err) {
                    console.error('Error retrieving product name:', err);
                } else {
                    const productName = productNameResult[0].name;
                    carts.forEach(cart => {
                        const { user_email, quantity } = cart;
                        console.log(user_email, quantity);
                        if (quantity >= quantity1) {
                            sendProductInCartEmail(user_email, productId, quantity1);
                            sendAdminNotification(productId, productName, user_email); // Pass productId, productName, and userEmail
                        }
                    });
                }
            });
        }
    });
}

function sendAdminNotification(productId, productName, userEmail) {
    const adminEmailQuery = `
        SELECT email
        FROM users
        WHERE role = 'admin';
    `;

    MYSQL.query(adminEmailQuery, (err, admins) => {
        if (err) {
            console.error('Error retrieving admin emails:', err);
        } else {
            const adminEmails = admins.map(admin => admin.email).join(', ');
            const mailOptions = {
                from: 'f219085@cfd.nu.edu.pk',
                to: adminEmails,
                subject: 'Product Quantity Exceeded in Cart',
                html: `<p>The quantity of product ${productName} in user's cart (${userEmail}) has exceeded the available quantity.</p>`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email to admins:', error);
                } else {
                    console.log('Email sent to admins:', info.response);
                }
            });
        }
    });
}

function sendProductInCartEmail(userEmail, productId, quantity) {
    const productNameQuery = `
        SELECT name
        FROM products
        WHERE id = ?;
    `;
    MYSQL.query(productNameQuery, [productId], (err, product) => {
        if (err) {
            console.error('Error retrieving product name:', err);
        } else {
            const productName = product[0].name;
            const mailOptions = {
                from: 'f219085@cfd.nu.edu.pk',
                to: userEmail,
                subject: 'Product in Cart Out of Stock',
                html: `<p>Product ${productName}, which is in your cart, is now out of stock.</p>`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email to user about product in cart:', error);
                } else {
                    console.log(`Email sent to ${userEmail} about product ${productName} in cart.`);
                }
            });
        }
    });
}


module.exports = Checkout;
