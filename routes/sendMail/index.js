const express = require ("express");
const router = express.Router();
const send = require("./send");

router.post("/send",send);
module.exports = router;