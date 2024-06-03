const express = require("express");
const router = express.Router();
const courseShow = require("./course-show");
const courseCreate = require("./course-create");
const courseEdit = require("./course-edit");
const courseDelete = require("./course-delete");

const { tokenVerification } = require("../../middleware");

// ROUTES * /api/courses/
router.post("/course-show",tokenVerification, courseShow);
router.post("/course-create",tokenVerification, courseCreate);
router.post("/course-edit",tokenVerification, courseEdit);
router.post("/course-delete",tokenVerification, courseDelete);
module.exports = router;