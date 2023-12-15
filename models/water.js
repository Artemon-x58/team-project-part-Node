const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const waterSchema = new Schema(
  {
    waterAndDate: [
      {
        water: { type: Number, required: [true, "set the amount of water"] },
        date: {
          type: String,
          required: true,
        },
      },
    ],
    recommendedWater: {
      type: Number,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

waterSchema.post("save", handleMongooseError);

const Water = model("water", waterSchema);

module.exports = Water;
