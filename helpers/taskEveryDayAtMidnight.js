const cron = require("node-cron");
const {
  Water,
  Calories,
  User,
  Weight,
  NutrientsPerDay,
  Meals,
} = require("../models");
const currentDate = require("./currentDate");

const taskEveryDayAtMidnight = (owner) => {
  const taskEvery10Seconds = async () => {
    const today = currentDate();
    console.log("Функция выполняется каждые 10 секунд");
    await Water.findOneAndUpdate(
      { owner },
      { $push: { waterAndDate: { water: 0, date: today } } },
      { new: true, upsert: true }
    ).exec();

    await Calories.findOneAndUpdate(
      { owner },
      {
        $push: {
          caloriesAndDate: {
            calories: 0,
            carbohydrates: 0,
            protein: 0,
            fat: 0,
            date: today,
          },
        },
      },
      { new: true, upsert: true }
    ).exec();

    const user = await User.findOne({ _id: owner }).exec();

    await Weight.findOneAndUpdate(
      { owner },
      { $push: { weightAndDate: { weight: user.weight, date: today } } },
      { new: true, upsert: true }
    ).exec();

    const initialState = { calories: 0, carbohydrates: 0, protein: 0, fat: 0 };

    await NutrientsPerDay.findOneAndUpdate(
      { owner },
      {
        $set: {
          breakfast: initialState,
          dinner: initialState,
          lunch: initialState,
          snack: initialState,
        },
      },
      { new: true }
    ).exec();

    await Meals.findOneAndUpdate(
      { owner },
      { $set: { breakfast: [], dinner: [], lunch: [], snack: [] } },
      { new: true }
    ).exec();
  };

  cron.schedule("0 0 * * *", taskEvery10Seconds);
};

//  "*/10 * * * * *"
module.exports = taskEveryDayAtMidnight;
