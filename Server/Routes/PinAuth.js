const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const Pinauth = express.Router();
const { MYSQL } = require("../Mysql");

Pinauth.use(bodyParser.json());

async function sendVerificationCode(email, code) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'f219085@cfd.nu.edu.pk', 
      pass: '' 
    }
  });

  const mailOptions = {
    from: 'f219085@cfd.nu.edu.pk',
    to: email,
    subject: 'Email Verification Code',
    text: `Your verification code is: ${code}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification code sent successfully');
  } catch (error) {
    console.error('Error sending verification code:', error);
    throw error;
  }
}

Pinauth.post('/', async (req, res) => {
  try {
      console.log("email : ",req.body)
    const { email } = req.body;

    let verificationCode;

    const code = Math.floor(1000 + Math.random() * 9000);

    await sendVerificationCode(email, code.toString());

    verificationCode = code.toString();
    console.log(verificationCode);
    res.status(200).json({verificationCode});
  } catch (error) {
    console.error('Error sending verification code:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = Pinauth;
