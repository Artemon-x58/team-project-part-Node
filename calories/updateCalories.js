const { Calories } = require("../models");
const macronutrients = require("./macronutrients");
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

  await Calories.findOneAndUpdate(
    { owner },
    { $set: { recommendedCalories: { calories, ...objectMacronutrients } } },
    { new: true }
  ).exec();
};

module.exports = updateCalories;
