const Course = require("../../../models/courses/index");
const { ObjectID } = require("../../../types");
const { find } = require("../../../helpers");
const Joi = require("joi");
const express = require("express");
const mongoose = require("mongoose");

const schema = Joi.object({
  userId: Joi.string().alphanum().length(24).required()
});

const showCourseAll = async (req, res) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send({
        status: 400, message: error.details[0].message
      });
    }

    const { userId } = req.body;
    console.log("Received userId:", userId);
    const searchQuery = { userId: mongoose.Types.ObjectId(userId) };

    const courses = await find("course", searchQuery);
    console.log(courses, "courses");

    if (courses.length > 0) {
      const courseArray = await Promise.all(courses.map(async (element) => {
        const exams = await find("exam", { courseId: element._id });
        const examNames = exams.map(exam => exam.examName);

        return {
          _id: element._id,
          userId: userId,
          courseName: element.courseName,
          courseCode: element.courseCode,
          courseCRN: element.courseCRN,
          exams: examNames
        };
      }));

      return res.status(200).send({ status: 200, courseArray });
    } else {
      return res.status(404).send({
        status: 404, message: 'No courses found for this user.'
      });
    }
  } catch (e) {
    return res.status(500).send({
      status: 500, message: e.message
    });
  }
};

module.exports = showCourseAll;
