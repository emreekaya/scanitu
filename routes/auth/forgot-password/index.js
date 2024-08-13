const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { findOne, updateDocument } = require("../../../helpers");
const { sendEmail } = require("../../../utils/email"); // email gönderme fonksiyonu
const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email().required(),
});

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const { error } = schema.validate({ email });
  
  if (error) {
    return res.status(400).send({ status: 400, message: error.details[0].message });
  }

  try {
    const user = await findOne('user', { email: email });

    if (!user) {
      return res.status(404).send({ status: 404, message: 'User not found' });
    }

    // Token oluşturma
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = bcrypt.hashSync(resetToken, 10);
    const tokenExpiration = Date.now() + 3600000; // 1 saat geçerli olacak

    // Token ve süresini veritabanına kaydetme
    await updateDocument('user', { _id: user._id }, {
      $set: { resetPasswordToken: hashedToken, resetPasswordExpires: tokenExpiration }
    });

    // Reset linkini içeren email gönderme
    const resetLink = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
    await sendEmail({
      to: email,
      subject: 'Password Reset',
      text: `Please use the following link to reset your password: ${resetLink}`
    });

    return res.status(200).send({ status: 200, message: 'Password reset link has been sent to your email.' });
  } catch (e) {
    return res.status(500).send({ status: 500, message: e.message });
  }
};

module.exports = forgotPassword;
