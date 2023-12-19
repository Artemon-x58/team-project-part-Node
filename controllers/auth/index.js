const { ctrlWrapper } = require("../../helpers");

const register = require("./register");
const login = require("./login");
const logOut = require("./logOut");
const updateAvatar = require("./updateAvatar");
const currentUser = require("./currentUser");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logOut: ctrlWrapper(logOut),
  updateAvatar: ctrlWrapper(updateAvatar),
  currentUser: ctrlWrapper(currentUser),
};
