const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'f219085@cfd.nu.edu.pk',
      pass: '12345678' 
    }
  });

  module.exports = {transporter};
