const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET } = require("../../../config");
const { getPopulatedData } = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});

const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const validate = await schema.validateAsync(req.body);
    const user = await getPopulatedData("user", { userName: userName });
    if (user) {
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res
          .status(404)
          .send({ status: 400, message: "Invalid Username or Password!" });
      }
      user.password = undefined;
      var token = jwt.sign({ id: user._id }, SECRET);
      res.status(200).send({ status: 200,token });
    } else {
      return res
        .status(404)
        .send({ status: 404, message: "User does not exist!" });
    }
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = loginUser;
