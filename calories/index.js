const initialCaloriesValue = require("./initialCaloriesValue");
const recommendedCalories = require("./recommendedCalories");
const macronutrients = require("./macronutrients");
const updateCalories = require("./updateCalories");
const addCaloriesToday = require("./addCaloriesToday");
const deleteCaloriesToday = require("./deleteCaloriesToday");
const sumObjectProperties = require("./sumObjectProperties");
const initialNutrientsPerDay = require("./initialNutrientsPerDay");
const addNutrientsPerDay = require("./addNutrientsPerDay");
const deleteNutrientsPerDay = require("./deleteNutrientsPerDay");
const updateNutrientsPerDay = require("./updateNutrientsPerDay");

module.exports = {
  macronutrients,
  updateCalories,
  addCaloriesToday,
  deleteCaloriesToday,
  sumObjectProperties,
  recommendedCalories,
  initialCaloriesValue,
  initialNutrientsPerDay,
  addNutrientsPerDay,
  deleteNutrientsPerDay,
  updateNutrientsPerDay,
};
