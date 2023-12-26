const {
  User,
  Meals,
  NutrientsPerDay,
  Water,
  Weight,
  Calories,
} = require("../../models");
const {
  HttpError,
  currentDate,

  macronutrients,
  recommendedWaterHelper,
  recommendedCaloriesHelper,
} = require("../../helpers");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const taskEveryDayAtMidnight = require("../../helpers/taskEveryDayAtMidnight");

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
    throw HttpError(404, "User not found");
  }

  await Meals.create({
    breakfast: [],
    dinner: [],
    lunch: [],
    snack: [],
    owner: newUser.id,
  });

  const initialState = { calories: 0, carbohydrates: 0, protein: 0, fat: 0 };
  await NutrientsPerDay.create({
    breakfast: initialState,
    dinner: initialState,
    lunch: initialState,
    snack: initialState,
    owner: newUser.id,
  });

  const water = recommendedWaterHelper(weight, kef);
  const date = currentDate();

  await Water.create({
    waterAndDate: { water: 0, date },
    owner: newUser.id,
    recommendedWater: water,
  });

  await Weight.create({
    weightAndDate: { weight, date },
    owner: newUser.id,
  });

  const calories = recommendedCaloriesHelper(gender, weight, height, kef, age);
  const objectMacronutrients = macronutrients(yourGoal, calories);
  await Calories.create({
    caloriesAndDate: {
      calories: 0,
      date,
      protein: 0,
      fat: 0,
      carbohydrates: 0,
    },
    owner: newUser.id,
    recommendedCalories: { calories, ...objectMacronutrients },
  });

  taskEveryDayAtMidnight(newUser.id);

  res.status(201).json({
    code: 201,
    user: {
      email: newUser.email,
    },
  });
};

module.exports = register;
