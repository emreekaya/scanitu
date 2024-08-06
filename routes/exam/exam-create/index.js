const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { insertNewDocument } = require("../../../helpers");
const Joi = require("joi");
const { ObjectID } = require("../../../types");
const Exam = require("../../../models/exam");

const schema = Joi.object({
  courseId: ObjectID,
  examName: Joi.string().required(),
  questionNumber: Joi.number().required(),
  totalExamScore: Joi.number().required(),
  questionDetails: Joi.array().items(
    Joi.object({
      questionNumber: Joi.number().required(),
      points: Joi.number().required(),
      abetCriteria: Joi.array().items(Joi.string().required()).required()
    })
  ).min(1).required()
});

const insertExam = async (req, res) => {
  const { courseId, examName, questionNumber,totalExamScore, questionDetails } = await req.body;
  
  // Validate request body against the schema
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({ status: 400, message: error.details[0].message });
  }

  // Validate that the number of questions matches the number of question details provided
  if (questionNumber !== questionDetails.length) {
    return res.status(400).send({ status: 400, message: 'The number of question details must match the question number.' });
  }

  try {
    // Check if an exam with the same name exists for the given course
    const existingExam = await Exam.findOne({ courseId, examName });
    if (existingExam) {
      return res.status(400).send({ status: 400, message: 'There is already an exam with the same name for this course.' });
    }

    const newExam = {
      courseId,
      examName,
      questionNumber,
      totalExamScore,
      questionDetails
    };

    // Insert new exam document
    const createdExam = await insertNewDocument("exam", newExam);
    
    return res.status(200).send({ status: 200, exam: createdExam });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = insertExam;
