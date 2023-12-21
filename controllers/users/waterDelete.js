const { currentDate } = require("../../helpers");
const { Water } = require("../../models");

const waterDelete = async (req, res) => {
  const { id: owner } = req.user;

  const today = currentDate();

  await Water.findOneAndUpdate(
    { owner, "waterAndDate.date": today },
    { $set: { "waterAndDate.$.water": 0 } },
    { new: true }
  ).exec();

  res.json({ water: 0 });
};

module.exports = waterDelete;
