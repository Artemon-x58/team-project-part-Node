const { currentDate } = require("../../helpers");
const { Water } = require("../../models");

const waterDelete = async (req, res) => {
  const { id: owner } = req.user;

  const today = currentDate();

  const result = await Water.findOneAndUpdate(
    { owner, "waterAndDate.date": today },
    { $set: { "waterAndDate.$.water": 0 } },
    { new: true }
  ).exec();

  res.status(200).json({ result });
};

module.exports = waterDelete;
