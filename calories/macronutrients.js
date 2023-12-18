const { HttpError } = require("../helpers");

const macronutrients = (yourGoal, calories) => {
  let protein, fat;

  switch (yourGoal) {
    case "lose fat":
      protein = calories * 0.25;
      fat = calories * 0.2;
      break;
    case "maintain":
      protein = calories * 0.2;
      fat = calories * 0.25;
      break;
    case "gain muscle":
      protein = calories * 0.3;
      fat = calories * 0.2;
      break;
    default:
      throw HttpError(404, "Invalid goal");
  }

  const carbohydrates = calories - protein - fat;

  return { protein, fat, carbohydrates };
};

module.exports = macronutrients;
