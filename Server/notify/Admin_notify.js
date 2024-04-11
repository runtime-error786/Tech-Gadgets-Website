const nodemailer = require('nodemailer');
let {transporter} = require("../Config/Transporter");
const { MYSQL } = require("../Models/dbconfig");
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

module.exports = {sendAdminNotification}