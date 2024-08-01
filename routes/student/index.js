const express = require("express");
const router = express.Router();
const insertStudent = require("./student-create");
const deleteStudent = require("./student-delete");
const showStudent = require("./student-show");
const editStudent = require("./student-edit");
const upload = require("../../uploads")
const {tokenVerification} = require("../../middleware");

//Routes * /api/student/
router.post("/student-create",tokenVerification, upload.single('file'),insertStudent);
//router.post("/student-delete",tokenVerification,deleteStudent);
// router.post("student-edit",tokenVerification,editStudent);
// router.get("student-show",tokenVerification,showStudent);

module.exports = router;