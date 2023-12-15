const { ctrlWrapper } = require("../../helpers");
const waterChange = require("./waterChange");

module.exports = {
  waterChange: ctrlWrapper(waterChange),
};
