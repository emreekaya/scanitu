const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { ObjectID } = require("../../../types");
const { deleteDocument,findOne } = require("../../../helpers");
const Joi = require("joi");
const { courses } = require("../../../models");
const schema = Joi.object({
  courseId: ObjectID
});

const courseDelete = async (req, res) => {
  const { courseId } = await req.body;

  const { error } = schema.validate({ courseId });
  if (error) {
    return res.status(400).send({ status: 400, message: error.details[0].message });
  }

  try {
    // Belirtilen courseId ile kursu bul ve sil
    const deletedCourse = await findOne("course", {_id: courseId});
    if (!deletedCourse) {
      return res.status(404).send({ status: 404, message: `Course with ID ${courseId} not found.` });
    }
    await deleteDocument("course", { _id: courseId });
    return res.status(200).send({ status: 200, message: 'Course successfully deleted.', deletedCourse });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = courseDelete;
