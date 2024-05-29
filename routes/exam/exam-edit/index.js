const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { updateDocument, findOne } = require("../../../helpers");
const Joi = require("joi");
const { ObjectID } = require("../../../types");
const { exam } = require("../../../models");

const schema = Joi.object({
  examId: ObjectID,
  examName: Joi.string().required(),
  questionNumber: Joi.number().required(),
});

const editExam = async (req, res) => {
  const {examId, examName, questionNumber} = await req.body;
  try {
    const exam = await findOne("exam", {_id: examId})
    if(exam){
        edittedExam = await updateDocument("exam",{_id: examId},{examName: examName, questionNumber: questionNumber});        
    }
    else{
      return res.status(404).send({ status: 404, message: 'Exam not found' });
    }   
    return res.status(200).send({ status: 200,
                                                examName: edittedExam.examName,
                                                questionNumber: edittedExam.questionNumber
                                                },);
  } 
  
  catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = editExam;
