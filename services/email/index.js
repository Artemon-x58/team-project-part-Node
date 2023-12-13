const sendEmail = require("./sendEmail");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");
const { ctrlWrapper } = require("../../helpers");

module.exports = {
  sendEmail,
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
