const { HttpError, funcToFixed } = require("../../helpers");
const { Meals, NutrientsPerDay } = require("../../models");

const getDiary = async (req, res) => {
  const { id: owner } = req.user;

  const meals = await Meals.findOne({
    owner,
  }).exec();

  if (!meals) {
    throw HttpError(404, "Meals not found");
  }

  const diary = await NutrientsPerDay.findOne({
    owner,
  }).exec();

  if (!diary) {
    throw HttpError(404, "Nutrients not found");
  }

  const breakfast = meals.breakfast;
  const lunch = meals.lunch;
  const dinner = meals.dinner;
  const snack = meals.snack;
  res.json({
    breakfast,
    lunch,
    dinner,
    snack,
    breakfastSumNutrientsToday: funcToFixed(diary.breakfast),
    lunchtSumNutrientsToday: funcToFixed(diary.lunch),
    dinnerSumNutrientsToday: funcToFixed(diary.dinner),
    snackSumNutrientsToday: funcToFixed(diary.snack),
  });
};

module.exports = getDiary;
