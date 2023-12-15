const { currentDate } = require("../helpers");
const { Water } = require("../models");
const recommendedWater = require("./recommendedWater");

const initialWaterValue = async (userId, weight, kef) => {
  const water = recommendedWater(weight, kef);
  const date = currentDate();

  await Water.create({
    waterAndDate: { water: 0, date },
    owner: userId,
    recommendedWater: water,
  });
};

module.exports = initialWaterValue;
