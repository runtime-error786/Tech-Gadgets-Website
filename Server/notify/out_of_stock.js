const nodemailer = require('nodemailer');
let {transporter} = require("../Config/Transporter");
const { MYSQL } = require("../Models/dbconfig");

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

module.exports = {sendProductOutOfStockEmail};