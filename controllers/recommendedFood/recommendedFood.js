const { HttpError } = require("../../helpers");
const { RecommendedFood } = require("../../models");

const recommendedFood = async (req, res) => {
  const allRecommendedFood = await RecommendedFood.find().exec();

  if (!recommendedFood) {
    throw HttpError(404, "RecommendedFood not found");
  }

  res.status(200).json({ allRecommendedFood });
};

module.exports = recommendedFood;
