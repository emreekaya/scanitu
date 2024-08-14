const express = require('express');
const { exportGradesAndSendEmail } = require('../../../export');
const { getUserProfile } = require('../../user-profile/getUserProfile');
const { find, findOne } = require('../../../helpers');
const { ObjectID } = require('../../../types');
const router = express.Router();

router.post('/send', async (req, res) => {
  try {
    const { examId } = req.body;

    if (!examId) {
      return res.status(400).send({
        status: 400, message: 'examId is required'
      });
    }

    // 1. Exam tablosundan courseId'yi al
    const examData = await findOne("exam", { _id: ObjectID(examId) });
    if (!examData) {
      return res.status(404).send({
        status: 404, message: `Exam with ID ${examId} not found.`
      });
    }

    // 2. Course tablosundan userId'yi al
    const courseData = await findOne("course", { _id: ObjectID(examData.courseId) });
    if (!courseData) {
      return res.status(404).send({
        status: 404, message: `Course with ID ${examData.courseId} not found.`
      });
    }

    // 3. User tablosundan kullanıcıyı al
    const userData = await findOne("user", { _id: ObjectID(courseData.userId) });
    if (!userData) {
      return res.status(404).send({
        status: 404, message: `User with ID ${courseData.userId} not found.`
      });
    }

    const userEmail = userData.email;

    // 4. Grades tablosundan notları al
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
        return res.status(404).send({
          status: 404, message: "There are no scores for this exam."
        });
      }

      // Excel dosyasını oluşturup e-posta ile gönder
      await exportGradesAndSendEmail({ examName: examData.examName, gradeArray }, userEmail);

      return res.status(200).send({
        status: 200, message: "Grades exported and email sent successfully."
      });
    } else {
      return res.status(404).send({
        status: 404, message: "There are no scores for this exam."
      });
    }
  } catch (e) {
    return res.status(400).send({
      status: 400, message: e.message
    });
  }
});

module.exports = router;
