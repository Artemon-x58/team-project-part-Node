const { currentDate } = require("../helpers");
const { Weight } = require("../models");

const initialWeightValue = async (userId, weight) => {
  const date = currentDate();

  await Weight.create({
    weightAndDate: { weight, date },
    owner: userId,
  });
};

module.exports = initialWeightValue;
