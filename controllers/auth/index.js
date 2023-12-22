const { ctrlWrapper } = require("../../helpers");

const register = require("./register");
const login = require("./login");
const logOut = require("./logOut");
const currentUser = require("./currentUser");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logOut: ctrlWrapper(logOut),
  currentUser: ctrlWrapper(currentUser),
};
