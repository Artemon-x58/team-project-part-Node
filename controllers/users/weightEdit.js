const {
  currentDate,
  HttpError,
  recommendedCaloriesHelper,
  recommendedWaterHelper,
  macronutrients,
} = require("../../helpers");
const { Weight, User, Water, Calories } = require("../../models");

const weightEdit = async (req, res) => {
  const { id: owner } = req.user;
  const { weight } = req.body;

  const today = currentDate();

  const user = await User.findByIdAndUpdate(
    owner,
    { weight },
    {
      new: true,
    }
  ).exec();
  if (!user) {
    throw HttpError(404);
  }
  const calories = recommendedCaloriesHelper(
    user.gender,
    user.weight,
    user.height,
    user.kef,
    user.age
  );
  const objectMacronutrients = macronutrients(user.yourGoal, calories);

  const resultCalories = await Calories.findOneAndUpdate(
    { owner },
    { $set: { recommendedCalories: { calories, ...objectMacronutrients } } },
    { new: true }
  ).exec();
  if (!resultCalories) {
    throw HttpError(404, "Calories not found");
  }

  const water = recommendedWaterHelper(user.weight, user.kef);

  const resultWater = await Water.findOneAndUpdate(
    { owner },
    { $set: { recommendedWater: water } },
    { new: true }
  );
  if (!resultWater) {
    throw HttpError(404, "Water not found");
  }

  const existingWeight = await Weight.findOne({
    owner,
    "weightAndDate.date": today,
  }).exec();

  if (!existingWeight) {
    throw HttpError(404, "Weight not found");
  }

  const result = await Weight.findOneAndUpdate(
    { owner, "weightAndDate.date": today },
    { $set: { "weightAndDate.$.weight": weight } },
    { new: true }
  ).exec();
  if (!result) {
    throw HttpError(404, "Weight not found");
  }

  const { recommendedWater } = await Water.findOne({ owner }).exec();
  if (!recommendedWater) {
    throw HttpError(404, "Water not found");
  }

  const { recommendedCalories } = await Calories.findOne({ owner }).exec();

  if (!recommendedCalories) {
    throw HttpError(404, "Calories not found");
  }
  res.status(200).json({ weight, recommendedCalories, recommendedWater });
};

module.exports = weightEdit;
