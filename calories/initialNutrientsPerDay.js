const { NutrientsPerDay } = require("../models");

const initialState = { calories: 0, carbohydrates: 0, protein: 0, fat: 0 };

const initialNutrientsPerDay = async (userId) => {
  await NutrientsPerDay.create({
    breakfast: initialState,
    dinner: initialState,
    lunch: initialState,
    snack: initialState,
    owner: userId,
  });
};

module.exports = initialNutrientsPerDay;
