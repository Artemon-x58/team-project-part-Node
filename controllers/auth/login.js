const { User } = require("../../models");

const jwt = require("jsonwebtoken");

const { HttpError } = require("../../helpers");

const bcrypt = require("bcrypt");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw HttpError(400);
  }

  const user = await User.findOne({ email }).exec();
  if (!user || !bcrypt.compare(password, user.password)) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "230h" });

  const result = await User.findByIdAndUpdate(user._id, { token }).exec();
  if (!result) {
    throw HttpError(404, "User not found");
  }

  res.status(200).json({
    token,
  });
};

module.exports = login;
