const express = require("express");
const router = express.Router();
const courseShow = require("./course-show");
 const { tokenVerification } = require("../../middleware");
const courseCreate = require("./course-create");
// ROUTES * /api/courses/
router.get("/course-show",tokenVerification, courseShow);
router.post("/course-create",tokenVerification, courseCreate);
module.exports = router;