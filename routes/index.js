const express = require("express");
const { tokenVerification } = require("../middleware");
const auth = require("./auth");
const user = require("./user-type");
const exam = require("./exam/exams.js")
const friend = require("./friend")
const course = require("./courses");
const reminder = require("./reminders");
const getUserProfile = require("./user-profile/getUserProfile.js");
const plantIdentify = require("./plant-identification/plant-identify.js")
const userType = require("./user-type");
const router = express.Router();


// AUTH Routes * /api/auth/*
router.use("/auth", auth);
router.use("/user", user);
// AUTH Routes * /api/*
router.post("/plant-identification", tokenVerification, plantIdentify);
// AUTH Routes * /api/*
router.use("/exam", exam);
router.use("/courses",course);
router.use("/friend", friend);
router.post("/userProfile", tokenVerification, getUserProfile);
router.use("/reminder", reminder);
router.use("/user-type", userType);

module.exports = router;
