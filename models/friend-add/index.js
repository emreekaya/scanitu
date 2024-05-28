const mongoose = require("mongoose");
const friendSchema = require("./friend-schema");

const friend = mongoose.model("friends", friendSchema);

module.exports = friend;
