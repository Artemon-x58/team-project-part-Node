const { RecommendedFood } = require("../../models");

const recommendedFood = async (req, res) => {
  const allRecommendedFood = await RecommendedFood.find().exec();

  res.status(200).json({ code: 200, allRecommendedFood });
};

module.exports = recommendedFood;
