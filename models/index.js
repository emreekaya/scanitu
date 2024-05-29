const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.exam = require("./exam/index.js");
db.course = require("./courses");


module.exports = db;
