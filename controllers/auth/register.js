const { User } = require("../../models");
const { HttpError, taskEveryDayAtMidnight } = require("../../helpers");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const { initialWaterValue } = require("../../water");
const { initialWeightValue } = require("../../weight");
const { initialCaloriesValue } = require("../../calories");
const initialDiary = require("../../diary/initialDairy");

const { initialNutrientsPerDay } = require("../../nutrients");

const register = async (req, res) => {
  const { name, email, password, age, weight, height, kef, gender, yourGoal } =
    req.body;
  const user = await User.findOne({ email }).exec();
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  if (
    !name ||
    !email ||
    !password ||
    !age ||
    !weight ||
    !height ||
    !kef ||
    !gender ||
    !yourGoal
  ) {
    throw HttpError(400);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  if (!newUser) {
    throw HttpError(404);
  }

  initialDiary(newUser.id);
  initialNutrientsPerDay(newUser.id);
  initialWaterValue(newUser.id, newUser.weight, newUser.kef);
  initialWeightValue(newUser.id, newUser.weight);
  initialCaloriesValue(
    newUser.id,
    newUser.gender,
    newUser.weight,
    newUser.height,
    newUser.kef,
    newUser.age,
    newUser.yourGoal
  );

  taskEveryDayAtMidnight(newUser.id);

  res.status(201).json({
    code: 201,
    user: {
      email: newUser.email,
    },
  });
};

module.exports = register;
