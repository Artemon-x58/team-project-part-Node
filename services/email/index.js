const sendEmail = require("./sendEmail");
const resendVerifyEmail = require("./resendVerifyEmail");
const { ctrlWrapper } = require("../../helpers");

module.exports = {
  sendEmail,
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
