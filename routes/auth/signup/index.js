const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET } = require("../../../config");
const { insertNewDocument, findOne } = require("../../../helpers");
const Joi = require("joi");
const { send_email } = require("../../../lib");
const schema = Joi.object({
  userName: Joi.string().required(),
  firstLastName: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
  email: Joi.string().email().required(),
});

const signUpUser = async (req, res) => {
  const { userName, password } = await req.body;
  try {
    //const validate = await schema.validateAsync(req.body);;
    const check_user_exist = await findOne("user", { userName: userName });
    if (check_user_exist) {
      return res
        .status(404)
        .send({ status: 404, message: "User already exist!" });
    }
    console.log(req.body);
    
    const new_user = {
      userName: await  req.body.userName,
      firstLastName: await req.body.firstLastName,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      email: await req.body.email,
    };
    const user = await insertNewDocument("user", new_user);
    let token = jwt.sign({ id: user._id }, SECRET);
    user.password = undefined;
    /*send_email(
      "registration-email",
      {
        username: user.first_name,
        location: "test",
      },
      "Health Titan Pro",
      "Awaiting Admin Approval",
      user.email
    );*/
    return res.status(200).send({ status: 200, user, token });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = signUpUser;
