const express = require("express");
const router = express.Router();
const addFriend = require("./friendAdd.js");
const friendCount = require("./getNumberOfFriends.js");
const deleteFriend = require("./deleteFriend.js");
const { tokenVerification } = require("../../middleware");

// ROUTES * /api/
router.post("/deleteFriend",tokenVerification, deleteFriend);
router.post("/addFriend",tokenVerification, addFriend);
router.post("/numberOfFriends",tokenVerification, friendCount);


module.exports = router;
