const { ctrlWrapper } = require("../../helpers");
const waterChange = require("./waterChange");
const updateSubscription = require("./updateSubscription");

module.exports = {
  waterChange: ctrlWrapper(waterChange),
  updateSubscription: ctrlWrapper(updateSubscription),
};
