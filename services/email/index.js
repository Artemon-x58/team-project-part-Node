const sendEmail = require("./sendEmail");
const sendPasswordResetEmail = require("./sendPasswordResetEmail ");
const { ctrlWrapper } = require("../../helpers");
const createNewPassword = require("./createNewPassword");

module.exports = {
  sendEmail,
  sendPasswordResetEmail: ctrlWrapper(sendPasswordResetEmail),
  createNewPassword: ctrlWrapper(createNewPassword),
};
