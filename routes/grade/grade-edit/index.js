const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Grade = require("../../../models/grade");
const Joi = require("joi");
const { ObjectID } = require("../../../types");
const schema = Joi.object({
    gradeId: ObjectID,
    studentId: Joi.string().required(),
    scores: Joi.object().pattern(
      Joi.string().pattern(/^\d+$/),
      Joi.alternatives().try(Joi.number(), Joi.string().allow(null, '').optional())
    ).optional()
  });
  
  const editGrade = async (req, res) => {
    const { gradeId, studentId, scores } = req.body;
  
    const { error } = schema.validate({ gradeId, studentId, scores });
    if (error) {
      return res.status(400).send({ status: 400, message: error.details[0].message });
    }
  
    try {
      // Verilen gradeId ile notu bul
      const grade = await Grade.findById(gradeId);
      if (!grade) {
        return res.status(404).send({ status: 404, message: `Grade with ID ${gradeId} not found.` });
      }
  
      // StudentId ve scores'u güncelle
      grade.studentId = studentId;
  
      if (scores && Object.keys(scores).length > 0) {
        for (const [key, value] of Object.entries(scores)) {
          const index = parseInt(key, 10) - 1; // Key 1-based index, array 0-based index
          if (index >= 0 && index < grade.scores.length) {
            grade.scores[index] = value === "" ? null : value;
          }
        }
      }
  
      // Güncellenmiş grade'i kaydet
      const updatedGrade = await grade.save();
  
      return res.status(200).send({ status: 200, updatedGrade });
    } catch (e) {
      return res.status(400).send({ status: 400, message: e.message });
    }
  };
  
  module.exports = editGrade;