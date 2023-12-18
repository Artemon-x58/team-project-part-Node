const { Diary } = require("../models");

const initialMacronutrientsData = [];

const initialDiary = async (userId) => {
  await Diary.create({
    breakfast: initialMacronutrientsData,
    dinner: initialMacronutrientsData,
    lunch: initialMacronutrientsData,
    snack: initialMacronutrientsData,
    owner: userId,
  });
};

module.exports = initialDiary;
