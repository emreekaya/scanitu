const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { updateDocument, findOne, } = require("../../../helpers");
const { ObjectID } = require("../../../types");
const Exam = require("../../../models/exam");
const Joi = require("joi");

// Validation schema
const schema = Joi.object({
  examId: ObjectID,
  courseId: ObjectID,
  examName: Joi.string(),
  questionNumber: Joi.number(),
  totalExamScore: Joi.number(),
  questionDetails: Joi.array().items(
    Joi.object({
      questionNumber: Joi.number().required(),
      points: Joi.number().required(),
      abetCriteria: Joi.array().items(Joi.string().required()).required()
    })
  ).min(1)
});

const updateExam = async (req, res) => {
  const { examId, courseId, examName, questionNumber, totalExamScore, questionDetails } = req.body;

  // Validate request body
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({ status: 400, message: error.details[0].message });
  }

  try {
    // Find the exam by ID and update it
    const updatedExam = await Exam.findByIdAndUpdate(
      examId,
      {
        courseId,
        examName,
        questionNumber,
        totalExamScore,
        questionDetails
      },
      { new: true }
    );

    if (!updatedExam) {
      return res.status(404).send({ status: 404, message: 'Exam not found.' });
    }

    return res.status(200).send({ status: 200, exam: updatedExam });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = updateExam;
