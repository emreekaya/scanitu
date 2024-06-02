const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { deleteDocument, findOne } = require("../../../helpers");
const Joi = require("joi");
const { ObjectID } = require("../../../types");
const { exam } = require("../../../models");

const schema = Joi.object({
  examId: ObjectID,
});

const deleteExam = async (req, res) => {
  const {examId} = await req.body;
  const { error } = schema.validate({ examId });
  if (error) {
    return res.status(400).send({ status: 400, message: error.details[0].message });
  }
  try {
    const exam = await findOne("exam", {_id: examId})
    if(!exam){        
      return res.status(404).send({ status: 404, message: "Exam not found" });
    }
    await deleteDocument("exam", { _id: examId });
    return res.status(200).send({ status: 200,message: "Exam is deleted."} );
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = deleteExam;
