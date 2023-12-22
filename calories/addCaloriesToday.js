const { currentDate, HttpError } = require("../helpers");
const { Calories } = require("../models");

const addCaloriesToday = async (
  owner,
  calories,
  carbohydrates,
  protein,
  fat
) => {
  const today = currentDate();

  const result = await Calories.findOneAndUpdate(
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

  if (!result) {
    throw HttpError(404, "Calories not found");
  }
};

module.exports = addCaloriesToday;
