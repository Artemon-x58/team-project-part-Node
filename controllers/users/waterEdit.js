const { currentDate, HttpError } = require("../../helpers");
const { Water } = require("../../models");

const waterEdit = async (req, res) => {
  const { id: owner } = req.user;
  const { water } = req.body;

  const today = currentDate();

  const updatedWater = await Water.findOneAndUpdate(
    { owner, "waterAndDate.date": today },
    { $inc: { "waterAndDate.$.water": water } },
    { new: true }
  );
  if (!updatedWater) {
    throw HttpError(404, "Water not found");
  }

  const addedWater = updatedWater.waterAndDate.find(
    (item) => item.date === today
  );

  res.status(200).json({ addedWater });
};

module.exports = waterEdit;
