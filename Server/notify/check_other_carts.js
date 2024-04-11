const nodemailer = require('nodemailer');
let {transporter} = require("../Config/Transporter");
const { MYSQL } = require("../Models/dbconfig");
let {sendAdminNotification} = require("./Admin_notify");
let {sendProductInCartEmail} = require("./Send_product_in_cart");

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

module.exports = {checkOtherCartsForProduct};
