const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET } = require("../../config");
const fs = require('fs'); // File system
const base64 = require('js-base64');  
const axios = require('axios'); // HTTP client
const FormData = require('form-data'); // Readable "multipart/form-data" streams

const PROJECT = 'all'; // try 'weurope' or 'canada'
const API_URL = 'https://my-api.plantnet.org/v2/identify/' + PROJECT + '?api-key=';
const API_PRIVATE_KEY = '2b10QiBDExyYlP0bUFg7oLoye'; // secret
const Joi = require("joi");

const schema = Joi.object({
  imageData: Joi.string().required(),
  organs: Joi.string().required()
});

const plantIdentify = async (req, res) => {
const { imageData, organs } = req.body;

let form = new FormData();
form.append('organs', organs);
form.append('images',  Buffer.from(imageData, 'base64'), { filename: "image.jpg" });
console.log('form', form.getHeaders());
try {
    const { status, data } = await axios.post(
        // list of probable species
        API_URL + API_PRIVATE_KEY,
        form, {
            headers: form.getHeaders()
        }
    );

    console.log('status', status); // should be: 200
    console.log('data', require('util').inspect(data, false, null, true));
    res.status(200).send({ status: 200, results: data.results[0] });
} catch (error) {
    console.error('error', error);
    res.status(400).send({ status: 400,msg: error });
}
};

module.exports = plantIdentify;
