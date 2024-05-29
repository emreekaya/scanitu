const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { updateDocument, findOne } = require("../../../helpers");
const Joi = require("joi");
const { ObjectID } = require("../../../types");
const { exam } = require("../../../models");

const schema = Joi.object({
  examId: ObjectID,
  examName: Joi.string().required(),
  questions: Joi.number().required(),
});

const editExam = async (req, res) => {
  const {examId, examName, questions} = await req.body;
  try {
    const exam = await findOne("exam", {_id: examId})
    if(exam){
            edittedExam = await updateDocument("exam",{_id: examId},{examName:examName, questions:questions});        
    }   
    return res.status(200).send({ status: 200, _id:edittedExam._id,
                                                courseId: edittedExam.courseId,
                                                examName: edittedExam.examName,
                                                createdAt: edittedExam.createdAt,
                                                questions: edittedExam.questions
                                                },);
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = editExam;
