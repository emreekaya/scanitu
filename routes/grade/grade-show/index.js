const { ObjectID } = require("../../../types");

const { find, findOne } = require("../../../helpers");
const Joi = require("joi");
const { cp } = require("fs");
const { course, exam } = require("../../../models");
const { Console } = require("console");
const schema = Joi.object({
examId: ObjectID,
});

const showGrade = async (req, res) => {
  try {
    const { examId } = await req.body;
    if (!examId ) {
      return res.status(400).send({
        status: 400, message: 'examId and is required'
      });
    }
    const examData = await findOne("exam", { _id: ObjectID(examId) });
    if (!examData) {
      return res.status(404).send({ status: 404, message: `Exam with ID ${examId} not found.` });
    }
    const searchQuery = { examId };
    const grades = await find("grade", searchQuery);

    if (grades.length > 0) {
      const gradeArray = grades.map(grade => ({
        _id: grade._id,
        examId: grade.examId,
        studentId: grade.studentId,
        scores: grade.scores
      }));

      const hasScores = gradeArray.some(grade => grade.scores && grade.scores.length > 0);

      if (!hasScores) {
        return res.status(404).send({ status: 404, message: "there is no score for this student" });
      }

      return res.status(200).send({ status: 200, examName: examData.examName, gradeArray });
    } else {
      return res.status(404).send({ status: 404, message: "there is no score for this student" });
    }
  } catch (e) {
    return res.status(400).send({
      status: 400, message: e.message
    });
  }
};

module.exports = showGrade;