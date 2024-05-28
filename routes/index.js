const express = require("express");
const { tokenVerification } = require("../middleware");
const auth = require("./auth");
const exam = require("./exam/exams.js")
const course = require("./courses");
const getUserProfile = require("./user-profile/getUserProfile.js");
const router = express.Router();



// AUTH Routes * /api/auth/*
router.use("/auth", auth);
//router.use("/user", user);
// AUTH Routes * /api/*
router.use("/exam", exam);
router.use("/courses",course);
router.post("/userProfile", tokenVerification, getUserProfile);

module.exports = router;
