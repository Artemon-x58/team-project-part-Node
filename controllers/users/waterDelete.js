const { currentDate, HttpError } = require("../../helpers");
const { Water } = require("../../models");

const waterDelete = async (req, res) => {
  const { id: owner } = req.user;

  const today = currentDate();

  const result = await Water.findOneAndUpdate(
    { owner, "waterAndDate.date": today },
    { $set: { "waterAndDate.$.water": 0 } },
    { new: true }
  ).exec();
  if (!result) {
    throw HttpError(404, "Water not found");
  }

  res.json({ water: 0 });
};

module.exports = waterDelete;
