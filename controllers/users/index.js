const { ctrlWrapper } = require("../../helpers");
const waterEdit = require("./waterEdit");
const updateSubscription = require("./updateSubscription");
const weightEdit = require("./weightEdit");

module.exports = {
  waterEdit: ctrlWrapper(waterEdit),
  updateSubscription: ctrlWrapper(updateSubscription),
  weightEdit: ctrlWrapper(weightEdit),
};
