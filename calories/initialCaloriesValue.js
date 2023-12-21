const { currentDate, HttpError } = require("../helpers");
const { Calories } = require("../models");
const { macronutrients } = require("../nutrients");

const recommendedCalories = require("./recommendedCalories");

const initialCaloriesValue = async (
  userId,
  gender,
  weight,
  height,
  kef,
  age,
  yourGoal
) => {
  const calories = recommendedCalories(gender, weight, height, kef, age);
  const objectMacronutrients = macronutrients(yourGoal, calories);
  const date = currentDate();

  const result = await Calories.create({
    caloriesAndDate: {
      calories: 0,
      date,
      protein: 0,
      fat: 0,
      carbohydrates: 0,
    },
    owner: userId,
    recommendedCalories: { calories, ...objectMacronutrients },
  });
  if (!result) {
    throw HttpError(404);
  }
};

module.exports = initialCaloriesValue;
