const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.exam = require("./exam/exam.js");
db.userType = require("./user-type");
db.friend = require("./friend-add");
db.course = require("./courses");
db.reminder = require("./reminder");

module.exports = db;
