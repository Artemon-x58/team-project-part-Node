const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const macronutrientsSchema = {
  title: {
    type: String,
    // required: [true, "enter a title"],
  },
  calories: {
    type: Number,
    required: [true, "set the amount of calories"],
  },
  carbohydrates: {
    type: Number,
    required: [true, "enter a carbohydrates"],
  },
  protein: {
    type: Number,
    required: [true, "enter a protein"],
  },
  fat: {
    type: Number,
    required: [true, "enter a fat"],
  },
};

const mealsSchema = new Schema(
  {
    breakfast: [macronutrientsSchema],
    dinner: [macronutrientsSchema],
    lunch: [macronutrientsSchema],
    snack: [macronutrientsSchema],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

mealsSchema.post("save", handleMongooseError);

const Meals = model("meal", mealsSchema);

module.exports = Meals;
