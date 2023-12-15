const { User } = require("../../models");

const jwt = require("jsonwebtoken");

const { HttpError } = require("../../helpers");

const bcrypt = require("bcrypt");

// require("dotenv");

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

  await User.findByIdAndUpdate(user._id, { token }).exec();

  res.status(200)
  .json({
    code: 200,
    token,
    user: {
      email: user.email,
    },
  });
};

module.exports = login;
