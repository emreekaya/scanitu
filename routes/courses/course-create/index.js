const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET } = require("../../../config");
const { insertNewDocument, findOne } = require("../../../helpers");
const Joi = require("joi");
const { send_email } = require("../../../lib");
const { ObjectID } = require("../../../types");
const schema = Joi.object({
  courseName: Joi.string().required(),
  courseCode: Joi.string().required(),
  courseCRN: Joi.string().required(),
  courseExams: Joi.array(),
  userId: Joi.string().required(),
});

const courseCreate = async (req, res) => {
  const { userId, courseName,courseCode,courseCRN } = await req.body;
  try {
    const newCourse = {
      userId,
      courseName,
      courseCode,
      courseCRN,
    };

    
    const new_course = {
      userId: await  req.body.userId,
      courseName: await  req.body.courseName,
      courseCode: await  req.body.courseCode,
      courseCRN: await  req.body.courseCRN,
    };
    const course = await insertNewDocument("course", new_course);

    return res.status(200).send({ status: 200, course });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = courseCreate;