const { NutrientsPerDay } = require("../models");

const initialNutrientsPerDay = async (userId) => {
  await NutrientsPerDay.create({
    breakfast: [],
    dinner: [],
    lunch: [],
    snack: [],
    owner: userId,
  });
};

module.exports = initialNutrientsPerDay;
