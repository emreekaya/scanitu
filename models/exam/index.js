const mongoose = require("mongoose");
const examSchema = require("./exam-schema");

const exam = mongoose.model("exam", examSchema);

module.exports = exam;