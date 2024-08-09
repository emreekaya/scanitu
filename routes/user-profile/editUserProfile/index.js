const { findOne,updateDocument } = require("../../../helpers");
const Joi = require("joi");
const { ObjectID } = require("../../../types");

const schema = Joi.object({
  userId: ObjectID,
  userName: Joi.string().required(),
  firstLastName: Joi.string().required(),
  email: Joi.string().email().required(),
});

const editUserProfile = async (req, res) => {
  // Gelen veriyi al ve doğrula
  const { userId, userName, firstLastName, email } = req.body;
  const { error } = schema.validate({ userId, userName, firstLastName, email });
  if (error) {
    return res.status(400).send({ status: 400, message: error.details[0].message });
  }

  try {
    // Kullanıcıyı güncelle
    const updatedUser = await updateDocument(
      "user",
      { _id: ObjectID },
      { $set: { userName, firstLastName, email } }
    );

    // Güncellenmiş kullanıcıyı döndür
    return res.status(200).send({ status: 200, userProfile: updatedUser });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = editUserProfile;
