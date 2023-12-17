const { currentDate } = require("../../helpers");
const { Water } = require("../../models");

const waterDelete = async (req, res) => {
  const { id: owner } = req.user;

  const today = currentDate();

  const { waterAndDate } = await Water.findOneAndUpdate(
    { owner, "waterAndDate.date": today },
    { $set: { "waterAndDate.$.water": 0 } },
    { new: true }
  ).exec();

  const todayWaterEntry = waterAndDate.find((entry) => entry.date === today);
  res.json({ code: 200, data: todayWaterEntry });
};
module.exports = waterDelete;
