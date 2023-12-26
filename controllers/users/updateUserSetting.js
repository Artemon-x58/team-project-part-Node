const {
  HttpError,
  currentDate,
  macronutrients,
  recommendedWaterHelper,
  recommendedCaloriesHelper,
} = require("../../helpers");
const { User, Water, Weight, Calories } = require("../../models");

const updateUserSetting = async (req, res) => {
  const date = currentDate();

  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  }).exec();
  if (!user) {
    throw HttpError(404, "User not found");
  }
  const { id: owner, name, weight, kef, gender, height, age, yourGoal } = user;
  const water = recommendedWaterHelper(weight, kef);

  const resultWater = await Water.findOneAndUpdate(
    { owner },
    { $set: { recommendedWater: water } },
    { new: true }
  );
  if (!resultWater) {
    throw HttpError(404, "Water not found");
  }

  const resultWeight = await Weight.findOneAndUpdate(
    { owner, "weightAndDate.date": date },
    { $set: { "weightAndDate.$.weight": weight } },
    { new: true }
  ).exec();
  if (!resultWeight) {
    throw HttpError(404, "Weight not found");
  }

  const calories = recommendedCaloriesHelper(gender, weight, height, kef, age);
  const objectMacronutrients = macronutrients(yourGoal, calories);

  const resultCalories = await Calories.findOneAndUpdate(
    { owner },
    { $set: { recommendedCalories: { calories, ...objectMacronutrients } } },
    { new: true }
  ).exec();
  if (!resultCalories) {
    throw HttpError(404, "Calories not found");
  }

  res.status(200).json({ name, weight, kef, gender, height, age });
};

module.exports = updateUserSetting;
