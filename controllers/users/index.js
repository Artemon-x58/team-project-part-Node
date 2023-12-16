const { ctrlWrapper } = require("../../helpers");
const waterEdit = require("./waterEdit");
const updateUserSetting = require("./updateUserSetting");
const weightEdit = require("./weightEdit");

module.exports = {
  waterEdit: ctrlWrapper(waterEdit),
  updateUserSetting: ctrlWrapper(updateUserSetting),
  weightEdit: ctrlWrapper(weightEdit),
};
