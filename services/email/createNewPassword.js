const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const { User } = require("../../models");

const createNewPassword = async (req, res) => {
  const { token, password } = req.body;

  const user = await User.findOneAndUpdate(
    { resetToken: token },
    {
      $set: {
        password: await bcrypt.hash(password, 10),
        resetToken: "",
      },
    },
    { new: true }
  );

  if (!user) {
    throw HttpError(400, "Invalid or expired reset token");
  }

  res.json({
    message: "Password reset successfully",
  });
};

module.exports = createNewPassword;



