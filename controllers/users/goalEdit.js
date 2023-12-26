const { HttpError, macronutrients } = require("../../helpers");
const { User, Calories } = require("../../models");

const goalEdit = async (req, res) => {
  const { id: owner } = req.user;

  const { yourGoal } = await User.findByIdAndUpdate(
    owner,
    { ...req.body },
    { new: true }
  ).exec();
  if (!yourGoal) {
    throw HttpError(404, "User not found");
  }

  const { recommendedCalories } = await Calories.findOne({ owner }).exec();
  const objectMacronutrients = macronutrients(
    yourGoal,
    recommendedCalories.calories
  );
  if (!recommendedCalories) {
    throw HttpError(404, "Calories not found");
  }

  const result = await Calories.findOneAndUpdate(
    { owner },
    {
      $set: {
        recommendedCalories: {
          calories: recommendedCalories.calories,
          ...objectMacronutrients,
        },
      },
    },
    { new: true }
  ).exec();
  if (!result) {
    throw HttpError(404, "Calories not found");
  }

  const newRecommended = result.recommendedCalories;

  res.status(200).send({ yourGoal, newRecommended });
};

module.exports = goalEdit;
