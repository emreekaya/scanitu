const express = require("express");
const router = express.Router();
const insertReminder = require("./insertReminder.js");
const deleteReminder = require("./deleteReminder.js");
const getReminders = require("./getReminders.js");

const { tokenVerification } = require("../../middleware");

// ROUTES * /api/reminder/
router.post("/insert",tokenVerification, insertReminder);
router.post("/delete",tokenVerification, deleteReminder);
router.get("/get",tokenVerification, getReminders);



module.exports = router;
