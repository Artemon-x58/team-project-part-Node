const { Diary } = require("../models");

const initialDiary = async (userId) => {
  await Diary.create({
    breakfast: [],
    dinner: [],
    lunch: [],
    snack: [],
    owner: userId,
  });
};

module.exports = initialDiary;
