const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { insertNewDocument,findOne } = require("../../helpers");
const Joi = require("joi");
const { ObjectID } = require("../../types");

const schema = Joi.object({
  reminderName: Joi.string().required(),
  reminderDate: Joi.string().required(),
  periodType: Joi.string().required(),
  isRepeat: Joi.boolean().required(),
  isActive: Joi.boolean().required(),
  plantName: Joi.string().required(),
});

const insertReminder = async (req, res) => {
  const { userId, reminderName,plantName,periodType,isRepeat,isActive,reminderDate } = await req.body;
  try {
    const new_reminder = {
      userId: userId,
      reminderName: reminderName,
      reminderDate: reminderDate,
      periodType: periodType,
      isRepeat: isRepeat,
      isActive: isActive,
      plantName: plantName,
    };

    const reminder = await insertNewDocument("reminder", new_reminder);

    new_reminder.reminderID = reminder._id;

    return res.status(200).send({ status: 200, new_reminder });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = insertReminder;
