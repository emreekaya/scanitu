const mongoose = require("mongoose");
const { DB_USER, DB_PASS, DB_NAME } = require("../");

mongoose.connect(
   'connection string from mongo'
);

module.exports = mongoose;
