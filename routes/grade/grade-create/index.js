const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Grade = require("../../../models/grade");

const { insertNewDocument } = require("../../../helpers");
const Joi = require("joi");
const { ObjectID } = require("../../../types");

const schema = Joi.object({
  examId: ObjectID,
  studentId: Joi.string().required(),
  scores: Joi.array().required(),
});

const insertGrade = async (req, res) => {
  const { examId,studentId,scores } = await req.body;
  const grades = await Grade.find({studentId: req.body.studentId,examId: req.body.examId});
  console.log("grade",grades);
  if(grades.length == 0) {
    try {
      const new_grade = {
        examId: examId,
        studentId: studentId,
        scores: scores
      };

      const user = await insertNewDocument("grade", new_grade);
      
      
      return res.status(200).send({ status: 200, new_grade });
    } catch (e) {
      return res.status(400).send({ status: 400, message: e.message });
    }
  }else
  return res.status(404).send({ status: 404, message: 'The student already has this exam grade.'});

  
};

module.exports = insertGrade;