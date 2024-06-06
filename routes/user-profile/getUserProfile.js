const {findOne,find } = require("../../helpers");
const Joi = require("joi");
const { ObjectID } = require("../../types");

const schema = Joi.object({
  userName: Joi.string().required(),
});

const getUserProfile = async (req, res) => {

  const { userName } = await req.body;
  try {
  
    const user = await findOne("user", { userName: userName });
    
    var userProfile = {
      userId: user._id,
      userName: user.userName,
      firstLastName: user.firstLastName,
    };
    return res.status(200).send({ status: 200,userProfile });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getUserProfile;