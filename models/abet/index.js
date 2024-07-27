const mongoose = require("mongoose");
const abetSchema = require("./abet-schema");
const abet = mongoose.model("abet", abetSchema);
module.exports = abet;