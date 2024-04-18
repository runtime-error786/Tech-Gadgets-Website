const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'f219085@cfd.nu.edu.pk',
      pass: 'mustafa782a' 
    }
  });

  module.exports = {transporter};