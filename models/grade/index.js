const mongoose = require("mongoose");
const gradeSchema = require("./grade-schema");

const grade = mongoose.model("grade", gradeSchema);

module.exports = grade;