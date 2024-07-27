const mongoose = require("mongoose");
const studentSchema = require("./student-schema");
const student = mongoose.model("student", studentSchema);
module.exports = student;