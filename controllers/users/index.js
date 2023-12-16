const { ctrlWrapper } = require("../../helpers");
const waterEdit = require("./waterEdit");
const updateUserSetting = require("./updateUserSetting");
const weightEdit = require("./weightEdit");
const waterDelete = require("./waterDelete");

module.exports = {
  waterEdit: ctrlWrapper(waterEdit),
  updateUserSetting: ctrlWrapper(updateUserSetting),
  weightEdit: ctrlWrapper(weightEdit),
  waterDelete: ctrlWrapper(waterDelete),
};
