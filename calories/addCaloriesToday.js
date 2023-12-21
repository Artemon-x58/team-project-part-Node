const { currentDate } = require("../helpers");
const { Calories } = require("../models");

const addCaloriesToday = async (
  owner,
  calories,
  carbohydrates,
  protein,
  fat
) => {
  const today = currentDate();

  await Calories.findOneAndUpdate(
    { owner, "caloriesAndDate.date": today },
    {
      $inc: {
        "caloriesAndDate.$.calories": calories,
        "caloriesAndDate.$.carbohydrates": carbohydrates,
        "caloriesAndDate.$.protein": protein,
        "caloriesAndDate.$.fat": fat,
      },
    },
    { new: true }
  ).exec();
};

module.exports = addCaloriesToday;
