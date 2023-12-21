const {
  getMonthNumber,
  perDayThisMonth,
  calculateAverage,
  HttpError,
} = require("../../helpers");
const { Calories, Weight, Water } = require("../../models");

const statistics = async (req, res) => {
  const { month } = req.body;
  const { id: owner } = req.user;

  const monthNumber = getMonthNumber(month);

  const { caloriesAndDate } = await Calories.findOne({
    owner,
  }).exec();
  if (!caloriesAndDate) {
    throw HttpError(404);
  }

  const { weightAndDate } = await Weight.findOne({
    owner,
  }).exec();
  if (!weightAndDate) {
    throw HttpError(404);
  }

  const { waterAndDate } = await Water.findOne({
    owner,
  }).exec();

  if (!waterAndDate) {
    throw HttpError(404);
  }

  const caloriesPerDayThisMonth = perDayThisMonth(caloriesAndDate, monthNumber);
  const weightPerDayThisMonth = perDayThisMonth(weightAndDate, monthNumber);
  const waterPerDayThisMonth = perDayThisMonth(waterAndDate, monthNumber);

  const averageCalories = calculateAverage(caloriesPerDayThisMonth, "calories");
  const averageWeight = calculateAverage(weightPerDayThisMonth, "weight");
  const averageWater = calculateAverage(waterPerDayThisMonth, "water");

  res.json({
    averageCalories,
    averageWeight,
    averageWater,
    caloriesPerDayThisMonth,
    weightPerDayThisMonth,
    waterPerDayThisMonth,
  });
};
module.exports = statistics;
