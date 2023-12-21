const { HttpError } = require("../helpers");
const { NutrientsPerDay } = require("../models");

const initialState = { calories: 0, carbohydrates: 0, protein: 0, fat: 0 };

const initialNutrientsPerDay = async (userId) => {
  const result = await NutrientsPerDay.create({
    breakfast: initialState,
    dinner: initialState,
    lunch: initialState,
    snack: initialState,
    owner: userId,
  });
  if (!result) {
    throw HttpError(404);
  }
};

module.exports = initialNutrientsPerDay;
