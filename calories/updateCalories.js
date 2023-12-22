const { HttpError } = require("../helpers");
const { Calories } = require("../models");
const { macronutrients } = require("../nutrients");

const recommendedCalories = require("./recommendedCalories");

const updateCalories = async (
  owner,
  gender,
  weight,
  height,
  kef,
  age,
  yourGoal
) => {
  const calories = recommendedCalories(gender, weight, height, kef, age);
  const objectMacronutrients = macronutrients(yourGoal, calories);

  const result = await Calories.findOneAndUpdate(
    { owner },
    { $set: { recommendedCalories: { calories, ...objectMacronutrients } } },
    { new: true }
  ).exec();
  if (!result) {
    throw HttpError(404, "Calories not found");
  }
};

module.exports = updateCalories;
