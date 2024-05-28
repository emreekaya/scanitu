const mongoose = require("mongoose");
const schemaType = require("../../types");

const examSchema = new mongoose.Schema({
  
  courseId: {
  type: mongoose.Schema.Types.ObjectID,
  required: true,
  ref: 'courses'
},
  examName: {
    type: String,
    required: true,
    maxLength: 50
  },
  questionNumber: {
  type: Number,
  required: true,
  unique: false,
  trim: true,
  default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true
});

module.exports = examSchema;
