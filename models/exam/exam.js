const mongoose = require("mongoose");
const examSchema = require("./exam-schema.js");

const exam = mongoose.model("exams", examSchema);

module.exports = exam;