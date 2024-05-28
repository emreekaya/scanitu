const mongoose = require("mongoose");
const courseSchema = require("./course-schema");

const course = mongoose.model("courses", courseSchema);

module.exports = course;