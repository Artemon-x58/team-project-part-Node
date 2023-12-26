const { currentDate, HttpError, funcToFixed } = require("../../helpers");
const {
  User,
  Calories,
  Water,
  RecommendedFood,
  NutrientsPerDay,
} = require("../../models");

const getCurrent = async (req, res) => {
  const { id: owner } = req.user;

  const today = currentDate();

  const user = await User.findOne({ _id: owner }).exec();

  if (!user) {
    throw HttpError(404, "User not found");
  }

  const { name, avatarURL, age, weight, height, kef, gender, yourGoal } = user;

  const { recommendedCalories, caloriesAndDate } = await Calories.findOne({
    owner,
  }).exec();
  if (!recommendedCalories || !caloriesAndDate) {
    throw HttpError(404, "Calories not found");
  }

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

  if (!recommendedWater || !waterAndDate) {
    throw HttpError(404, "Water not found");
  }

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
  if (!recommendedFood) {
    throw HttpError(404, "RecommendedFood not found");
  }

  const recommendedFoodForMainPage = recommendedFood.slice(0, 4);

  const diary = await NutrientsPerDay.findOne({
    owner,
  }).exec();

  if (!diary) {
    throw HttpError(404, "Nutrients not found");
  }

  const { breakfast, lunch, dinner, snack } = diary;

  res.json({
    user: { name, avatarURL, age, weight, height, kef, gender, yourGoal },
    recommendedWater,
    waterToday,
    recommendedCalories,
    caloriesToday: funcToFixed(caloriesToday),
    breakfastSumNutrientsToday: funcToFixed(breakfast, true),
    lunchSumNutrientsToday: funcToFixed(lunch, true),
    dinnerSumNutrientsToday: funcToFixed(dinner, true),
    snackSumNutrientsToday: funcToFixed(snack, true),
    recommendedFoodForMainPage,
  });
};

module.exports = getCurrent;
