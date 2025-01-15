const nodemailer = require('nodemailer'); // Doğrudan require
const path = require('path');
const { smtpConfig } = require('../../config'); // SMTP ayarlarını buradan alacak

const transporter = nodemailer.createTransport({
  host: 'smtp.itu.edu.tr',
  port: 587,
  secure: false, // TLS için secure: true olarak ayarlayın
  auth: {
    user: smtpConfig.user, // SMTP kullanıcı adı
    pass: smtpConfig.pass, // SMTP şifresi
  },
});

const sendEmailWithAttachment = async (to, subject, text, attachmentPath) => {
  const mailOptions = {
    from: '<user email>',
    to: to,
    subject: subject,
    text: text,
    attachments: [
      {
        filename: path.basename(attachmentPath),
        path: attachmentPath,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendEmailWithAttachment };
