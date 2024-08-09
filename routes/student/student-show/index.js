const { findOne } = require("../../../helpers");
const { student } = require("../../../models");
const { ObjectID } = require("../../../types");
const Joi = require("joi");
const mongoose = require("mongoose");

 const schema = Joi.object({
     courseId: ObjectID,
     studentId: ObjectID
     });
const showStudent = async (req, res) => {
  const { courseId } = req.body;

  try {
    // Kursu ve ona ait öğrencileri bulma
    const course = await findOne('course', { _id: ObjectID(courseId) });
    console.log(course, "course");
    if (!course) {
      return res.status(404).send({ status: 404, message: "Course not found" });
    }

    // Öğrenci bilgilerini listeleme
    const studentList = await Promise.all(
      course.students.map(async studentId => {
        const student = await findOne('student', { _id: studentId });
        return {
          studentId: student._id,
          studentName: student.studentName,
          studentNumber: student.studentNumber,
          studentMail: student.studentMail
        };
      })
    );

    return res.status(200).send({ status: 200, students: studentList });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = showStudent;
