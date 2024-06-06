const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { deleteDocument, findOne } = require("../../../helpers");
const Joi = require("joi");
const { ObjectID } = require("../../../types");
const { grade } = require("../../../models");

const schema = Joi.object({
  gradeId: ObjectID,
});

const deleteGrade = async (req, res) => {
  const {gradeId} = await req.body;
  const { error } = schema.validate({ gradeId });
  if (error) {
    return res.status(400).send({ status: 400, message: error.details[0].message });
  }
  try {
    const grade = await findOne("grade", {_id: gradeId})
    if(!grade){        
      return res.status(404).send({ status: 404, message: "Grade not found" });
    }
    await deleteDocument("grade", { _id: gradeId });
    return res.status(200).send({ status: 200,message: "Grade is deleted."} );
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = deleteGrade;
