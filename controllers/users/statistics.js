const { getMonthNumber, perDayThisMonth } = require("../../helpers");
const { Calories, Weight, Water } = require("../../models");

const statistics = async (req, res) => {
  const { month } = req.body;
  const { id: owner } = req.user;

  const monthNumber = getMonthNumber(month);

  const { caloriesAndDate } = await Calories.findOne({
    owner,
  }).exec();

  const { weightAndDate } = await Weight.findOne({
    owner,
  }).exec();

  const { waterAndDate } = await Water.findOne({
    owner,
  }).exec();

  const caloriesPerDayThisMonth = perDayThisMonth(caloriesAndDate, monthNumber);
  const weightPerDayThisMonth = perDayThisMonth(weightAndDate, monthNumber);
  const waterPerDayThisMonth = perDayThisMonth(waterAndDate, monthNumber);

  res.json({
    caloriesPerDayThisMonth,
    weightPerDayThisMonth,
    waterPerDayThisMonth,
  });
};
module.exports = statistics;
