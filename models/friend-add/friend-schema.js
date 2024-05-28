const mongoose = require("mongoose");
const schemaType = require("../../types");

const friendSchema = new mongoose.Schema({
  
  userId: {
  type: String,
  required: true,
  unique: true,
  trim: true
},
friendsId: {
  type: Array
},
});

module.exports = friendSchema;
