const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { find } = require("../../helpers");
const Joi = require("joi");
const { ObjectID } = require("../../types");


const getReminders = async (req, res) => {
  const { userId } = await req.body;
  try {
    const reminders = await find("reminder", {userId: userId});


    return res.status(200).send({ status: 200, reminders });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getReminders;
