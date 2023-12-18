const { currentDate } = require("../helpers");
const { Calories } = require("../models");

const macronutrients = require("./macronutrients");
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

  await Calories.create({
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
};

module.exports = initialCaloriesValue;
