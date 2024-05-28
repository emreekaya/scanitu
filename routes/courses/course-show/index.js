const Course = require("../../../models/courses/index");
const { find,findOne } = require("../../../helpers");
const  express = require("express");
const mongoose = require("mongoose");

const courseShow = async (req, res) => {
    try {
        const courses = await Course.find({});
        if(!courses || courses.length === 0) {
            return res.status(404).send({ status: 404, message: 'No courses found.' });
        }
        var user,exams;
        
        let allCourses = [courses.length];
        for(let i=0;i<courses.length;i++){
            var course ={
                _id: "",
                user_id: "",
                courseName: "",
                courseCode: "",
                exams: [],
                courseCRN: 0
                
            };
            var element = courses[i];
            user = await findOne("user", { _id: element.userId });
            exams = await find("exam", { courseId: element._id });

            course.userId= user.userId;
            course._id= element._id;
            course.courseName= element.courseName;
            course.courseCode= element.courseCode;
            course.exams= exams;
            course.courseCRN= element.courseCRN;
            allCourses[i]=course;
        }
        return res.status(200).send({ status: 200, message: 'Courses found.', courses:allCourses });
    }
    catch(err) {
        console.error(err);
        return res.status(500).send({ status: 500, message: 'Internal server error.' });
    }
};
module.exports = courseShow;
