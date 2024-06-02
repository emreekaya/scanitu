const { ObjectID } = require("../../../types");

const { find, findOne } = require("../../../helpers");
const Joi = require("joi");
const { cp } = require("fs");
const { course } = require("../../../models");
const { Console } = require("console");
const schema = Joi.object({
  courseId: ObjectID,
});

const showExam = async (req, res) => {
  try {
    const { courseId } = await req.body;
    if (!courseId) {
      return res.status(400).send({
        status: 400, message: 'courseId is required'
      });
    }
    var searchQuery = {};
    searchQuery["courseId"] = courseId;

    const exams = await find("exam", searchQuery);
    console.log(exams, "exams");
    if (courseId && exams.length > 0) {
      var examArray = [];
      for (let i = 0; i < exams.length; i++) {
        var exam = {
          _id: "",
          courseId: "",
          examName: "",
          questionNumber: 0
        };
        var element = exams[i];
        //exams = await findOne("exams", {courseId: req.body});
        //exams = await find("exam", { courseId: element._id });
        exam._id = element._id;
        exam.courseId = courseId;
        exam.examName = element.examName;
        exam.questionNumber = element.questionNumber;
        examArray[i] = exam;
      }
      return res.status(200).send({ status: 200, examArray });

    }
  } catch (e) {
    return res.status(400).send({
      status: 400, message: 'Sonuc yok'
    });
  }
};

module.exports = showExam;
