const express = require("express");
const router = express.Router();
const insertExam = require("./exam-create");
const deleteExam = require("./exam-delete");
const showExam = require("./exam-show");
const editExam = require("./exam-edit");

const { tokenVerification } = require("../../middleware");

// ROUTES * /api/exam/
router.post("/exam-create", insertExam);
router.post("/exam-delete",tokenVerification, deleteExam);
router.post("/exam-edit",tokenVerification, editExam);
router.post("/exam-show",tokenVerification, showExam);

module.exports = router;
