const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET } = require("../../../config");
const { insertNewDocument, findOne } = require("../../../helpers");
const Joi = require("joi");
const { send_email } = require("../../../lib");
const { ObjectID } = require("../../../types");
const schema = Joi.object({
  mainCategory: Joi.string().required(),
  subCategory: Joi.string().required(),
  criteriaCode: Joi.string().required(),
  criteriaDescription: Joi.array(),
});

const abetCreate = async (req, res) => {
  const { mainCategory,subCategory,criteriaCode,criteriaDescription } = await req.body;
  try {
    const newAbet = {
        mainCategory,
        subCategory,
        criteriaCode,
        criteriaDescription,

    };

    
    const new_abet = {
      mainCategory: await  req.body.mainCategory,
      subCategory: await  req.body.subCategory,
      criteriaCode: await  req.body.criteriaCode,
      criteriaDescription: await  req.body.criteriaDescription,

    };
    const abet = await insertNewDocument("abet", new_abet);

    return res.status(200).send({ status: 200, abet });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = abetCreate;