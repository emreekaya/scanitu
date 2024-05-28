const mongoose = require("mongoose");
const schemaType = require("../../types");

const reminderSchema = new mongoose.Schema({

userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: false,
    trim: true,
},
reminderName: {
    type: String,
    required: true,
    trim: true,
},
reminderDate: {
    type: String,
    required: true,
    trim: true,
},
periodType: {
    type: String,
    required: true,
    trim: true,
},
isRepeat: {
    type: Boolean,
    required: true,
    trim: true,
},
isActive: {
    type: Boolean,
    required: true,
    trim: true,
},
plantName: {
    type: String,
    required: true,
    trim: true,
},
});
module.exports = reminderSchema;