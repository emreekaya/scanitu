const mongoose = require("mongoose");
const schemaType = require("../../types");

const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
        trim: true,
    },
    studentNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    studentMail: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true
});

module.exports = studentSchema;
