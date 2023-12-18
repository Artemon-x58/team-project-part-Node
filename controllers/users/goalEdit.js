const { macronutrients } = require("../../calories");
const { HttpError } = require("../../helpers");
const { User, Calories } = require("../../models");

const goalEdit = async (req, res) => {
  const { id: owner } = req.user;

  const { goal } = req.body;

  const user = await User.findByIdAndUpdate(
    owner,
    { yourGoal: goal },
    { new: true }
  ).exec();
  if (!user) {
    throw HttpError(404);
  }

  const { recommendedCalories } = await Calories.findOne({ owner }).exec();
  const objectMacronutrients = macronutrients(
    user.yourGoal,
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

  res.status(200).send({ code: 200, user });
};

module.exports = goalEdit;
