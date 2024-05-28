const mongoose = require("mongoose");
const schemaType = require("../../types");

const courseSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        trim: true,
    },
    courseName: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        maxLength: 100
    },
    courseCode: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        maxLength: 50
    },
    courseExams: {
        type: Array,
        required: true,
        unique: false,
        trim: true,
        default: []
    },
    courseCRN: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
        maxLength: 10

    }
});
module.exports = courseSchema;