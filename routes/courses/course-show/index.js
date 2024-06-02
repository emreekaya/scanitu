const Course = require("../../../models/courses/index");
const { ObjectID } = require("../../../types");
const { find } = require("../../../helpers");
const Joi = require("joi");
const express = require("express");
const mongoose = require("mongoose");

const schema = Joi.object({
  userId: Joi.string().alphanum().length(24).required()
});

const showCourse = async (req, res) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send({
        status: 400, message: error.details[0].message
      });
    }

    const { userId } = req.body;
    console.log("Received userId:", userId);
    var searchQuery = { userId: mongoose.Types.ObjectId(userId) };

    const courses = await find("course", searchQuery);
    console.log(courses, "courses");
    if (courses.length > 0) {
      var courseArray = [];
      for (let i = 0; i < courses.length; i++) {
        var course = {
          _id: "",
          userId: "",
          courseName: "",
          courseCode: "",
          courseCRN: 0
        };
        var element = courses[i];
        course._id = element._id;
        course.userId = userId;
        course.courseName = element.courseName;
        course.courseCode = element.courseCode;
        course.courseCRN = element.courseCRN;
        courseArray[i] = course;
      }
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

module.exports = showCourse;
