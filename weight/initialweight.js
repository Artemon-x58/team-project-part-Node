const { currentDate, HttpError } = require("../helpers");
const { Weight } = require("../models");

const initialWeightValue = async (userId, weight) => {
  const date = currentDate();

  const result = await Weight.create({
    weightAndDate: { weight, date },
    owner: userId,
  });
  if (!result) {
    throw HttpError(404, "Weight not found");
  }
};

module.exports = initialWeightValue;
