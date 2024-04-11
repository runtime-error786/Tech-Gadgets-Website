const nodemailer = require('nodemailer');
let {transporter} = require("../Config/Transporter");
const { MYSQL } = require("../Models/dbconfig");
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

module.exports = {sendProductInCartEmail}