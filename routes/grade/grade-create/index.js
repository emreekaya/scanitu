const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Grade = require("../../../models/grade");
const Exam = require("../../../models/exam"); // Exam modelini dahil ediyoruz
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
        Joi.alternatives().try(Joi.number(), Joi.string().allow(null, '').optional())
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
    // Sınavın soru sayısını al
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).send({ status: 404, message: `Exam with ID ${examId} not found.` });
    }
    const questionNumber = exam.questionNumber;

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
        scores: Array(questionNumber).fill(null) // Soru sayısına göre null ile doldur
      };

      // Gelen scores objesini array formatına çevir
      if (scores && Object.keys(scores).length > 0) {
        for (const [key, value] of Object.entries(scores)) {
          const index = parseInt(key, 10) - 1; // Key 1-based index, array 0-based index
          if (index >= 0 && index < questionNumber) {
            new_grade.scores[index] = value === "" ? null : value;
          }
        }
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
