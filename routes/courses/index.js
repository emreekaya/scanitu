const express = require("express");
const router = express.Router();
const courseShow = require("./course-show");
 const { tokenVerification } = require("../../middleware");
// ROUTES * /api/courses/
router.get("/course-show",tokenVerification, courseShow);
module.exports = router;