const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const logOut = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, { token: "" }).exec();
  if (!result) {
    throw HttpError(404, "User not found");
  }
  res.send({
    message: "Logout success",
  });
};

module.exports = logOut;
