const mongoose = require("mongoose");
const reminderSchema = require("./reminder-schema");

const reminder = mongoose.model("reminders", reminderSchema);

module.exports = reminder;