const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.exam = require("./exam/");
db.course = require("./courses");
db.grade = require("./grade");
db.student = require("./student");
db.abet = require("./abet");
module.exports = db;
