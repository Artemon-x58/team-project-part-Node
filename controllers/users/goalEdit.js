const { macronutrients } = require("../../calories");
const { HttpError } = require("../../helpers");
const { User, Calories } = require("../../models");

const goalEdit = async (req, res) => {
  const { id: owner } = req.user;

  const { yourGoal } = await User.findByIdAndUpdate(
    owner,
    { ...req.body },
    { new: true }
  ).exec();
  if (!yourGoal) {
    throw HttpError(404);
  }

  const { recommendedCalories } = await Calories.findOne({ owner }).exec();
  const objectMacronutrients = macronutrients(
    yourGoal,
    recommendedCalories.calories
  );

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

  const newRecommended = result.recommendedCalories;

  res.status(200).send({ code: 200, yourGoal, newRecommended });
};

module.exports = goalEdit;



