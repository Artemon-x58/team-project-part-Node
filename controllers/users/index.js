const { ctrlWrapper } = require("../../helpers");
const waterEdit = require("./waterEdit");
const updateUserSetting = require("./updateUserSetting");
const weightEdit = require("./weightEdit");
const waterDelete = require("./waterDelete");
const goalEdit = require("./goalEdit");
const addDiary = require("./addDiary");
const deleteDiary = require("./deleteDiary");
const updateDiaryById = require("./updateDiaryById");
const statistics = require("./statistics");
const getCurrent = require("./getCurrent");
const deleteDairyById = require("./deleteDairyById");
const getDiary = require("./getDiary");
const updateAvatar = require("./updateAvatar");

module.exports = {
  waterEdit: ctrlWrapper(waterEdit),
  updateUserSetting: ctrlWrapper(updateUserSetting),
  weightEdit: ctrlWrapper(weightEdit),
  waterDelete: ctrlWrapper(waterDelete),
  goalEdit: ctrlWrapper(goalEdit),
  addDiary: ctrlWrapper(addDiary),
  deleteDiary: ctrlWrapper(deleteDiary),
  updateDiaryById: ctrlWrapper(updateDiaryById),
  statistics: ctrlWrapper(statistics),
  getCurrent: ctrlWrapper(getCurrent),
  deleteDairyById: ctrlWrapper(deleteDairyById),
  getDiary: ctrlWrapper(getDiary),
  updateAvatar: ctrlWrapper(updateAvatar),
};
