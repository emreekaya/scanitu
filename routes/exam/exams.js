const express = require("express");
const router = express.Router();
const insertExam = require("./insertExam.js");
const deleteExam = require("./deleteExam.js");
const showExam = require("./showExam.js");
const editExam = require("./editExam.js");

const { tokenVerification } = require("../../middleware");

// ROUTES * /api/Exam/
router.post("/insert",tokenVerification, insertExam);
router.post("/delete",tokenVerification, deleteExam);
router.post("/edit",tokenVerification, editExam);
router.post("/show",tokenVerification, showExam);

module.exports = router;
