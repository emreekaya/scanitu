const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { deleteDocument } = require("../../helpers");
const Joi = require("joi");
const { ObjectID } = require("../../types");
const { findOne } = require("../../models/user");

const schema = Joi.object({
    reminderID: Joi.string().required(),
});

const deleteReminder = async (req, res) => {
  const { userId, reminderID } = await req.body;
  try {

    deleteDocument("reminder",{_id: reminderID, userId: userId});

    
    return res.status(200).send({ status: 200, message: "Reminder deleted" });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = deleteReminder;
