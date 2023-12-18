const { User } = require("../../models");

const logOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" }).exec(); //, { new: true }
  // res.status(204)
  res.send({
    code: 204,
    message: "Logout success",
  });
};

module.exports = logOut;






