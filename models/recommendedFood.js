const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const recommendedFoodSchema = new Schema({
  name: {
    type: String,
    required: [true, "enter the product name"],
  },
  amount: {
    type: String,
    required: [true, "set the amount product"],
  },
  img: {
    type: String,
    required: [true, "enter the link to the image"],
  },
  calories: {
    type: Number,
    required: [true, "Enter the number of calories"],
  },
  nutrition: {
    carbohydrates: {
      type: Number,
      required: [true, "enter the amount of carbohydrates"],
    },
    protein: {
      type: Number,
      required: [true, "enter the amount of proteins"],
    },
    fat: {
      type: Number,
      required: [true, "enter the amount of fat"],
    },
  },
});

recommendedFoodSchema.post("save", handleMongooseError);

const RecommendedFood = model("RecommendedFood", recommendedFoodSchema);

module.exports = RecommendedFood;
