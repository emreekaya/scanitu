const mongoose = require("mongoose");
const schemaType = require("../../types");
const { ref } = require("joi");

  

const examSchema = new mongoose.Schema({
  
  courseId: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
    ref: 'courses'
},
  examName: {
    type: String,
    required: true,
    unique: false, 
    trim: true,
    maxLength: 50
  },
  questionNumber: {
    type: Number,
    required: true,
    unique: false,
    trim: true,
    default: 0
  },
  totalExamScore:{
    type: Number,
    required: true,
    unique: false,
    trim: true,
    default: 100
  },
  questionDetails:[{
    questionNumber: {
    type: Number,
    required: true,
    unique: false,
    trim: true,
    },
    points: {
      type: Number,
      required: true,
      unique: false,
      trim: true,
      default: 0
    },
    abetCriteria: [{
      type: mongoose.Schema.Types.ObjectID,
      required: true,
      unique: false,
      trim: true,
      ref: 'abet'
    }]
  }],

  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true
});

module.exports = examSchema;