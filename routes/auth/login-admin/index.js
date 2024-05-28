const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET } = require("../../../config");
const { getPopulatedData } = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
});

const loginAdmin = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const validate = await schema.validateAsync(req.body);
    const populatedUser = await getPopulatedData(
      "user",
      { userName: userName, role: "admin" },
    );
    
    if (populatedUser) {
        console.log(populatedUser.role);
      const passwordIsValid = bcrypt.compareSync(password, populatedUser.password);
      if (!passwordIsValid) {
        return res
          .status(404)
          .send({ status: 400, message: "Invalid Email or Password!" });
      }
      populatedUser.password = undefined;
      var token = jwt.sign({ id: populatedUser._id }, SECRET);
      res.status(200).send({ status: 200, populatedUser, token });
    } else {
      return res
        .status(404)
        .send({ status: 404, message: "User does not exist!" });
    }
  } catch (e) {
    res.status(400).send({ status: 400, message: "User access denied!!" });
  }
};

module.exports = loginAdmin;
