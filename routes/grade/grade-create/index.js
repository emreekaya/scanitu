const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Grade = require("../../../models/grade");
const { insertNewDocument } = require("../../../helpers");
const Joi = require("joi");
const { ObjectID } = require("../../../types");

const schema = Joi.object({
  examId: ObjectID,
  students: Joi.array().items(
    Joi.object({
      studentId: Joi.string().required(),
      scores: Joi.object().pattern(
        Joi.string().pattern(/^\d+$/),
        Joi.number()
      ).optional()
    })
  ).required()
});

const insertGrades = async (req, res) => {
  const { examId, students } = req.body;

  const { error } = schema.validate({ examId, students });
  if (error) {
    return res.status(400).send({ status: 400, message: error.details[0].message });
  }

  try {
    const newGrades = [];

    for (const student of students) {
      const { studentId, scores } = student;

      // Check if the grade already exists
      const existingGrade = await Grade.findOne({ studentId, examId });
      if (existingGrade) {
        return res.status(404).send({ status: 404, message: `The student with ID ${studentId} already has a grade for this exam.` });
      }

      const new_grade = {
        examId: ObjectID(examId),
        studentId: studentId,
      };
      if (scores && Object.keys(scores).length > 0) {
        new_grade.scores = scores;
      }
      newGrades.push(new_grade);
    }

    // Insert all new grades at once
    const insertedGrades = await Grade.insertMany(newGrades);

    return res.status(200).send({ status: 200, insertedGrades });

  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = insertGrades;
