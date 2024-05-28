const mongoose = require("mongoose");
const { DB_USER, DB_PASS, DB_NAME } = require("../");

mongoose.connect(
   'mongodb+srv://kaya22:blg492150160@test.lwfioaq.mongodb.net/'
);

module.exports = mongoose;
