const mongoose = require("mongoose");
const schemaType = require("../../types");

const userSchema = new mongoose.Schema({
  
  userName: {
  type: String,
  required: true,
  unique: true,
  trim: true,
  maxLength: 50
},
  firstLastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  password: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true
});

module.exports = userSchema;
