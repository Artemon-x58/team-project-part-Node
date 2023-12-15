const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const weightUserSchema = new Schema(
  {
    weightAndDate: [
      {
        weight: { type: Number, required: [true, "set the weight"] },
        date: {
          type: String,
          required: true,
        },
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

weightUserSchema.post("save", handleMongooseError);

const Weight = model("weight", weightUserSchema);

module.exports = Weight;
