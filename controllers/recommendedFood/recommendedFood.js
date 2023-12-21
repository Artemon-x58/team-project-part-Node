const { HttpError } = require("../../helpers");
const { RecommendedFood } = require("../../models");

const recommendedFood = async (req, res) => {
  const allRecommendedFood = await RecommendedFood.find().exec();

  if (!recommendedFood) {
    throw HttpError(404);
  }

  res.status(200).json({ code: 200, allRecommendedFood });
};

module.exports = recommendedFood;
