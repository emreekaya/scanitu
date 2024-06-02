const express = require("express");
const router = express.Router();
const courseShow = require("./course-show");
const courseCreate = require("./course-create");

const { tokenVerification } = require("../../middleware");

// ROUTES * /api/courses/
router.post("/course-show",tokenVerification, courseShow);
router.post("/course-create",tokenVerification, courseCreate);
module.exports = router;