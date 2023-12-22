const { currentDate, HttpError } = require("../helpers");
const { Water } = require("../models");
const recommendedWater = require("./recommendedWater");

const initialWaterValue = async (userId, weight, kef) => {
  const water = recommendedWater(weight, kef);
  const date = currentDate();

  const result = await Water.create({
    waterAndDate: { water: 0, date },
    owner: userId,
    recommendedWater: water,
  });
  if (!result) {
    throw HttpError(404, "Water not found");
  }
};

module.exports = initialWaterValue;
