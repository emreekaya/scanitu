const mongoose = require("mongoose");
const { DB_USER, DB_PASS, DB_NAME } = require("../");

mongoose.connect(
   process.env.MONGODB_URI || 'mongodb://localhost:27017/scanitu',
   {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   }
);

module.exports = mongoose;
