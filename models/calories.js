const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const caloriesSchema = new Schema(
  {
    caloriesAndDate: [
      {
        calories: {
          type: Number,
          required: [true, "set the amount of calories"],
        },
        date: {
          type: String,
          required: true,
        },
        protein: {
          type: Number,
          required: [true, "set the amount of protein"],
        },
        fat: {
          type: Number,
          required: [true, "set the amount of fat"],
        },
        carbohydrates: {
          type: Number,
          required: [true, "set the amount of carbohydrates"],
        },
      },
    ],
    recommendedCalories: {
      calories: {
        type: Number,
        required: [true, "set the amount of calories"],
      },
      protein: {
        type: Number,
        required: [true, "set the amount of protein"],
      },
      fat: {
        type: Number,
        required: [true, "set the amount of fat"],
      },
      carbohydrates: {
        type: Number,
        required: [true, "set the amount of carbohydrates"],
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

caloriesSchema.post("save", handleMongooseError);

const Calories = model("calorie", caloriesSchema);

module.exports = Calories;
