const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const macronutrientsSchema = {
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

const nutrientsPerDaySchema = new Schema(
  {
    breakfast: macronutrientsSchema,
    dinner: macronutrientsSchema,
    lunch: macronutrientsSchema,
    snack: macronutrientsSchema,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

nutrientsPerDaySchema.post("save", handleMongooseError);

const NutrientsPerDay = model("nutrientsPerDay", nutrientsPerDaySchema);

module.exports = NutrientsPerDay;
