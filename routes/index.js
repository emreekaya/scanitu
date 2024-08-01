const express = require("express");
const { tokenVerification } = require("../middleware");
const auth = require("./auth");
const exam = require("./exam");
const course = require("./courses");
const grade = require("./grade");
const abet = require("./abet");
const student = require("./student");
const getUserProfile = require("./user-profile/getUserProfile.js");
//const user = require("./user");

const router = express.Router();

// AUTH Routes * /api/auth/*
router.use("/auth", auth);
//router.use("/user", user);

// AUTH Routes * /api/*
router.use("/exam", exam);
router.use("/courses",course);
router.use("/grade",grade)
router.use("/abet",abet);
router.use("/student",student);
router.post("/userProfile", tokenVerification, getUserProfile);
module.exports = router;
