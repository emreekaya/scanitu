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
    const courseData = await findOne("course", { _id: ObjectID(courseId) });
    if (!courseData) {
      return res.status(404).send({ status: 404, message: `Course with ID ${courseId} not found.` });
    }
    var searchQuery = {};
    searchQuery["courseId"] = courseId;
    const exams = await find("exam", searchQuery);
    if (exams.length > 0) {
      const examArray = exams.map(exam => ({
        _id: exam._id,
        courseId: exam.courseId,
        examName: exam.examName,
        questionNumber: exam.questionNumber,
        totalExamScore: exam.totalExamScore,
        questionDetails: exam.questionDetails
      }));
      return res.status(200).send({ status: 200, courseName: courseData.courseName, examArray });
    }
    else{
      return res.status(404).send({ status: 404, message: "No exams found for this course" });
    }
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = showExam;
