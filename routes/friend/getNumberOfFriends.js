const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {findOne } = require("../../helpers");
const Joi = require("joi");
const { ObjectID } = require("../../types");

const schema = Joi.object({
});

const friendCount = async (req, res) => {

  const { userId } = await req.body;
  try {
    var number =0;
    var friends = await findOne("friend", {userId: userId});
    number = friends.friendsId.length;  
    
    
    return res.status(200).send({ status: 200, friendCount: number });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = friendCount;
