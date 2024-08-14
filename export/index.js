const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
//const smtpConfig = require("../config");
const nodemailer = require('nodemailer'); // Doğrudan require
const { getUserProfile } = require('../routes/user-profile/getUserProfile'); // Kullanıcı bilgilerini almak için

const smtpConfig = {
    host: 'smtp.itu.edu.tr',
    port: 587,
    auth: {
      user: 'kaya22@itu.edu.tr', // SMTP kullanıcı adı
      pass: 'Em.ka.1519', // SMTP şifresi
    },
};

const transporter = nodemailer.createTransport(smtpConfig);

const sendEmailWithAttachment = async (to, subject, text, filePath) => {
  const mailOptions = {
    from: 'kaya22@itu.edu.tr',
    to,
    subject,
    text,
    attachments: [
      {
        filename: path.basename(filePath),
        path: filePath,
      },
    ],
  };

  return transporter.sendMail(mailOptions);
};

const exportGradesAndSendEmail = async (examData, userEmail) => {
  try {
    // Excel dosyasını oluştur
    const filePath = path.join(__dirname, `grades-${examData.examName}.xlsx`);

    // Excel dosyasına yaz
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(examData.gradeArray.map(grade => ({
      studentNumber: grade.studentId,
      scores: grade.scores.join(', '), // Scores'ları virgüllerle ayırarak yazdırma
    })));
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Grades');
    xlsx.writeFile(workbook, filePath);

    // E-posta gönder
    await sendEmailWithAttachment(
      userEmail,
      'Exam Grades Report',
      'Please find attached the grades report for the exam.',
      filePath
    );

    // Dosyayı sil
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error('Error exporting grades and sending email:', error);
    throw new Error('Failed to export grades and send email.');
  }
};

module.exports = { exportGradesAndSendEmail };
