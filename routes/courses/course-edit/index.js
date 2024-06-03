const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { ObjectID } = require("../../../types");
const { findOne, updateDocument } = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  courseId: ObjectID,
  courseName: Joi.string().optional(),
  courseCode: Joi.string().optional(),
  courseCRN: Joi.number().optional()
});

const courseEdit = async (req, res) => {
  const { courseId, courseName, courseCode, courseCRN } = req.body;

  const { error } = schema.validate({ courseId, courseName, courseCode, courseCRN });
  if (error) {
    return res.status(400).send({ status: 400, message: error.details[0].message });
  }

  try {
    // Belirtilen courseId ile kursu bul
    const course = await findOne("course", { _id: courseId });
    if (!course) {
      return res.status(404).send({ status: 404, message: `Course with ID ${courseId} not found.` });
    }

    // Kurs bilgilerini güncelle
    const updatedFields = {};
    if (courseName) updatedFields.courseName = courseName;
    if (courseCode) updatedFields.courseCode = courseCode;
    if (courseCRN) updatedFields.courseCRN = courseCRN;

    const updatedCourse = await updateDocument("course", { _id: ObjectID(courseId) }, updatedFields);

    return res.status(200).send({ status: 200, message: 'Course successfully updated.', updatedCourse });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = courseEdit;
