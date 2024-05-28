const express = require("express");
const router = express.Router();
const addUserType = require("./add-user-type");
const deleteUserType = require("./delete-user-type");
const getUserTypes = require("./get-user-types");
const updateUserType = require("./update-user-type");
const getAdminTypes = require("./get-admin-types");
const editUserRole = require("./update-admin-types");
const updateBlacklistTypes = require("./update-blackListTypes");
// ROUTES * /api/user/
router.get("/get-user-types", getUserTypes);
router.post("/add-user-type", addUserType);
router.delete("/delete-user-type", deleteUserType);
router.put("/update-user-type/:id", updateUserType);
router.get("/get-admin-types", getAdminTypes);
router.put("/edit-user-role", editUserRole);
router.put("/update-blackListTypes", updateBlacklistTypes);
module.exports = router;
