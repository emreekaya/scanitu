const express = require("express");
const router = express.Router();
const { tokenVerification } = require("../../middleware");
const getUserProfile = require("./getUserProfile");
const editUserProfile = require("./editUserProfile");

//Routes * /api/user-profile/
router.post("/editUserProfile", tokenVerification, editUserProfile);
router.post("/getuserProfile", tokenVerification, getUserProfile);

module.exports = router;