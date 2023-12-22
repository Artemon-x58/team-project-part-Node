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
    throw HttpError(404, "Calories not found");
  }

  const { weightAndDate } = await Weight.findOne({
    owner,
  }).exec();
  if (!weightAndDate) {
    throw HttpError(404, "Weight not found");
  }

  const { waterAndDate } = await Water.findOne({
    owner,
  }).exec();

  if (!waterAndDate) {
    throw HttpError(404, "Water not found");
  }

  const caloriesPerDayThisMonth = perDayThisMonth(
    caloriesAndDate,
    monthNumber
  ).map((item) => parseFloat(item.calories.toFixed(2)));
  const weightPerDayThisMonth = perDayThisMonth(weightAndDate, monthNumber).map(
    (item) => parseFloat(item.weight.toFixed(2))
  );
  const waterPerDayThisMonth = perDayThisMonth(waterAndDate, monthNumber).map(
    (item) => parseFloat(item.water.toFixed(2))
  );

  const averageCalories = calculateAverage(caloriesPerDayThisMonth);
  const averageWeight = calculateAverage(weightPerDayThisMonth);
  const averageWater = calculateAverage(waterPerDayThisMonth);

  res.json({
    averageCalories: parseFloat(averageCalories.toFixed(2)),
    averageWeight: parseFloat(averageWeight.toFixed(2)),
    averageWater: parseFloat(averageWater.toFixed(2)),
    caloriesPerDayThisMonth: caloriesPerDayThisMonth,
    weightPerDayThisMonth: weightPerDayThisMonth,
    waterPerDayThisMonth: waterPerDayThisMonth,
  });
};
module.exports = statistics;
