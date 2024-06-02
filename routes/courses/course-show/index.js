const Course = require("../../../models/courses/index");
const {ObjectID} = require('../../../types');
const { find,findOne } = require("../../../helpers");
const Joi = require("joi");
const  express = require("express");
const mongoose = require("mongoose");
const { token } = require("morgan");
const { user } = require("../../../models");
const userSchema = require("../../../models/user/user-schema");
const { obj } = require("../../../models/courses/course-schema");
const schema = Joi.object({
    userId: ObjectID
});
const showCourse = async (req, res) => {
    try {
      const { userId } = await req.body;
      if (!userId) {
        return res.status(400).send({
          status: 400, message: 'userId is required'
        });
      }
      var searchQuery = {};
      searchQuery["userId"] = userId;
  
      const courses = await find("course", searchQuery);
      console.log(courses, "courses");
      if (userId && courses.length > 0) {
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
          course._id= element._id;
          course.userId= userId;
          course.courseName= element.courseName;
          course.courseCode= element.courseCode;
          course.courseCRN= element.courseCRN;
          courseArray[i] = course;
        }
        return res.status(200).send({ status: 200, courseArray });
  
      }
    } catch (e) {
      return res.status(400).send({
        status: 400, message: 'Sonuc yok'
      });
    }
  };
  
  module.exports = showCourse;
  
