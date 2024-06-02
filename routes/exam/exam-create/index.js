const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Exam = require("../../../models/exam");

const { insertNewDocument } = require("../../../helpers");
const Joi = require("joi");
const { ObjectID } = require("../../../types");

const schema = Joi.object({
  courseId: ObjectID,
  examName: Joi.string().required(),
  questionNumber: Joi.number().required(),
});

const insertExam = async (req, res) => {
  const { courseId,examName,questionNumber } = await req.body;
  const courses = await Exam.find({courseId:req.body.courseId,examName:req.body.examName});

  if(courses.length === 0) {
    try {
      const new_exam = {
        //userId: userId,
        courseId: courseId,
        examName: examName,
        questionNumber: questionNumber,
      };
  
      const user = await insertNewDocument("exam", new_exam);
  
      
      return res.status(200).send({ status: 200, new_exam });
    } catch (e) {
      return res.status(400).send({ status: 400, message: e.message });
    }
  }else
  return res.status(404).send({ status: 404, message: 'There is already the same exam for the course' });

  
};

module.exports = insertExam;
