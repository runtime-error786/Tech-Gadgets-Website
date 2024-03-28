const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'f219085@cfd.nu.edu.pk',
      pass: '03009435877' 
    }
  });

  module.exports = {transporter};