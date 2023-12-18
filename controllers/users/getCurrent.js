const { currentDate, HttpError } = require("../../helpers");
const {
  User,
  Calories,
  Water,
  RecommendedFood,
  Diary,
} = require("../../models");

const getCurrent = async (req, res) => {
  const { id: owner } = req.user;

  const today = currentDate();

  const user = await User.findOne({ owner }).exec();

  if (!user) {
    throw HttpError(404, "User not found");
  }

  const { name, avatarURL, age, weight, height, kef, gender, yourGoal } = user;

  const { recommendedCalories, caloriesAndDate } = await Calories.findOne({
    owner,
  }).exec();

  const caloriesToday = caloriesAndDate.reduce((acc, item) => {
    if (item.date === today) {
      acc = {
        calories: item.calories,
        date: item.date,
        protein: item.protein,
        fat: item.fat,
        carbohydrates: item.carbohydrates,
      };
    }
    return acc;
  }, {});

  const { recommendedWater, waterAndDate } = await Water.findOne({
    owner,
  }).exec();

  const waterToday = waterAndDate.reduce((acc, item) => {
    if (item.date === today) {
      acc = {
        water: item.water,
        date: item.date,
      };
    }
    return acc;
  }, {});

  const recommendedFood = await RecommendedFood.find();

  const diary = await Diary.findOne({
    owner,
  }).exec();

  const findEntryByDate = (arr) => {
    return arr.filter((item) => item.date === today);
  };

  const breakfast = findEntryByDate(diary.breakfast);
  const lunch = findEntryByDate(diary.lunch);
  const dinner = findEntryByDate(diary.dinner);
  const snack = findEntryByDate(diary.snack);

  res.json({
    user: { name, avatarURL, age, weight, height, kef, gender, yourGoal },
    recommendedCalories,
    caloriesToday,
    recommendedWater,
    waterToday,
    recommendedFood,
    breakfast,
    lunch,
    dinner,
    snack,
  });
};

module.exports = getCurrent;
