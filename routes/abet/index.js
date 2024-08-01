const express = require("express");
const router = express.Router();
const insertAbet = require("./abet-create");
const deleteAbet = require("./abet-delete");
const showAbet = require("./abet-show");
const editAbet = require("./abet-edit");

const { tokenVerification } = require("../../middleware");

// ROUTES * /api/abet/
router.post("/abet-create",tokenVerification, insertAbet);
router.post("/abet-delete",tokenVerification, deleteAbet);
router.post("/abet-edit",tokenVerification, editAbet);
router.get("/abet-show",tokenVerification, showAbet);

module.exports = router;
