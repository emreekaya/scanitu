const express = require("express");
const router = express.Router();
const sendEmailWithAttachment = require("./email");
const {tokenVerification} = require("../middleware");

router.post("/email",tokenVerification,sendEmailWithAttachment);
module.exports = router;