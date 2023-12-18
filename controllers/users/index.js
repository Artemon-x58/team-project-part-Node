const { ctrlWrapper } = require("../../helpers");
const waterEdit = require("./waterEdit");
const updateUserSetting = require("./updateUserSetting");
const weightEdit = require("./weightEdit");
const waterDelete = require("./waterDelete");
const goalEdit = require("./goalEdit");
const addDiary = require("./addDiary");
const deleteDiary = require("./deleteDiary");
const updateDiary = require("./updateDiary");
const statistics = require("./statistics");
const getCurrent = require("./getCurrent");

module.exports = {
  waterEdit: ctrlWrapper(waterEdit),
  updateUserSetting: ctrlWrapper(updateUserSetting),
  weightEdit: ctrlWrapper(weightEdit),
  waterDelete: ctrlWrapper(waterDelete),
  goalEdit: ctrlWrapper(goalEdit),
  addDiary: ctrlWrapper(addDiary),
  deleteDiary: ctrlWrapper(deleteDiary),
  updateDiary: ctrlWrapper(updateDiary),
  statistics: ctrlWrapper(statistics),
  getCurrent: ctrlWrapper(getCurrent),
};
