const { macronutrients } = require("../../calories");
const { HttpError } = require("../../helpers");
const { User, Calories } = require("../../models");

const goalEdit = async (req, res) => {
  const { id: owner } = req.user;

  const { goal } = req.body;

  const { yourGoal } = await User.findByIdAndUpdate(
    owner,
    { yourGoal: goal },
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

  await Calories.findOneAndUpdate(
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

  res.status(200).send({ code: 200, yourGoal });
};

module.exports = goalEdit;
