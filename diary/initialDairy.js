const { Meals } = require("../models");

const initialDiary = async (userId) => {
  await Meals.create({
    breakfast: [],
    dinner: [],
    lunch: [],
    snack: [],
    owner: userId,
  });
};

module.exports = initialDiary;
