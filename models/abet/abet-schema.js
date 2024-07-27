const mongoose = require("mongoose");
const schemaType = require("../../types");

const abetSchema = new mongoose.Schema({
    mainCategory: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    subCategory: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    criteriaCode: { //ABET criteria code
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    criteriaDescription: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    
});
module.exports = abetSchema;