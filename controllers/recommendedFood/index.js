const recommendedFood = require("./recommendedFood");
const { ctrlWrapper } = require("../../helpers");

module.exports = { recommendedFood: ctrlWrapper(recommendedFood) };
