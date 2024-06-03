const express = require("express");
const router = express.Router();
const insertGrade = require("./grade-create");
const deleteGrade = require("./grade-delete");
const showGrade = require("./grade-show");
const editGrade = require("./grade-edit");

const { tokenVerification } = require("../../middleware");

// ROUTES * /api/exam/
router.post("/grade-create",tokenVerification, insertGrade);
router.post("/grade-delete",tokenVerification, deleteGrade);
router.post("/grade-edit",tokenVerification, editGrade);
router.post("/grade-show",tokenVerification, showGrade)
module.exports = router;