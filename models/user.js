const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      match: /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
    },
    age: {
      type: Number,
      required: [true, "Set age for user"],
    },
    weight: {
      type: Number,
      required: [true, "Set weight for user"],
    },
    height: {
      type: Number,
      required: [true, "Set height for user"],
    },
    kef: {
      type: Number,
      required: [true, "Set kef for user"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Set gender for user"],
    },
    yourGoal: {
      type: String,
      enum: ["lose fat", "maintain", "gain muscle"],
      required: [true, "Set your goal for user"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
