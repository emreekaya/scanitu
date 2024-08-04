const mongoose = require("mongoose");
const schemaType = require("../../types");
const { ref } = require("joi");

const courseSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: false,
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
    courseCRN: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
        maxLength: 10

    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    }]
    // studentId:{
    //     type:mongoose.Schema.Types.ObjectID ,
    //     required:false,
    //     trim:true,
    //     ref:'student'
    // },
});
module.exports = courseSchema;