const { currentDate, HttpError } = require("../../helpers");
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
    throw HttpError(404);
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
    throw HttpError(404);
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
    throw HttpError(404);
  }

  const recommendedFoodForMainPage = recommendedFood.slice(0, 4);

  const diary = await NutrientsPerDay.findOne({
    owner,
  }).exec();

  if (!diary) {
    throw HttpError(404);
  }

  const { breakfast, lunch, dinner, snack } = diary;

  res.json({
    user: { name, avatarURL, age, weight, height, kef, gender, yourGoal },
    recommendedWater,
    waterToday,
    recommendedCalories,
    caloriesToday,
    breakfastSumNutrientsToday: breakfast,
    lunchtSumNutrientsToday: lunch,
    dinnerSumNutrientsToday: dinner,
    snackSumNutrientsToday: snack,
    recommendedFoodForMainPage,
  });
};

module.exports = getCurrent;
