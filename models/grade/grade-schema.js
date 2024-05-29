const mongoose = require("mongoose");
const schemaType = require("../../types");

const gradeSchema = new mongoose.Schema({
    
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'exam'
    },
    studentId: {
        type: Number,
        required: true,
        unique: true,
    },
    scores: {
        type: Array,
        required: true,
        unique: false,
        trim: true,
        default: []
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true
});
module.exports = gradeSchema;