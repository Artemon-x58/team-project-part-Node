const { currentDate, HttpError } = require("../../helpers");
const { Water } = require("../../models");
require("dotenv").config();

const waterEdit = async (req, res) => {
  const { id: owner } = req.user;
  const { water } = req.body;

  const today = currentDate();

  const updatedWater = await Water.findOneAndUpdate(
    { owner, "waterAndDate.date": today },
    { $inc: { "waterAndDate.$.water": water } },
    { new: true }
  );
  const addedWater = updatedWater.waterAndDate.find(
    (item) => item.date === today
  );
  if (!updatedWater) {
    throw HttpError(404);
  }

  res.status(200).json({ data: addedWater });
};

module.exports = waterEdit;
