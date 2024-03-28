const nodemailer = require('nodemailer');
let {transporter} = require("./Transporter");

async function sendEmail(req) {


  const mailOptions = {
    from: 'f219085@cfd.nu.edu.pk',
    to: req.body.email,
    subject: 'Thank You for Signing Up 😊',
    html: `<div style="background-color: #f0f0f0; padding: 20px; font-family: Arial, sans-serif;">
    <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Credentials:</h1>
    <div style="background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <p style="font-size: 16px; margin-bottom: 20px;"><strong>Name:</strong> ${req.body.name}</p>
        <p style="font-size: 16px; margin-bottom: 20px;"><strong>Email:</strong> ${req.body.email}</p>
        <p style="font-size: 16px; margin-bottom: 20px;"><strong>Country:</strong> ${req.body.country}</p>
        <p style="font-size: 16px; margin-bottom: 20px;"><strong>Password:</strong> ${req.body.password}</p>
        <p style="font-size: 16px; color: red; margin-bottom: 0;"><strong>Do Not Share It With Others!</strong></p>
        <p style="font-size: 12px; color: #999; margin-top: 5px;">This email was sent via Nodemailer</p>
    </div>
</div>
`
  };

  console.log('Before sending email');

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

 function handleEmailMiddleware(req, res, next) {
  try {
    console.log("hello",req.body.email)
     sendEmail(req); 
    next(); 
  } catch (error) {
    console.error('Error handling email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { handleEmailMiddleware };
