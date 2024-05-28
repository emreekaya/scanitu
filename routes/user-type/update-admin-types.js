const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { updateDocument, findOne } = require("../../helpers");
const Joi = require("joi");
const { ObjectID } = require("../../types");
//const { user } = require("../../models");

const schema = Joi.object({
  userId: ObjectID,
  userRole: Joi.string().required(),
});

const editUserRole = async (req, res) => {
  const { userId, userRole } = await req.body;
  try {
    const user = await findOne("user", { _id: userId });
    if (!user) {
      throw new Error("User not found.");
    }
      updateDocument("user", { _id: userId }, { role: userRole });
      return res.status(200).send({ status: 200, message: "Role is updated." });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = editUserRole;
