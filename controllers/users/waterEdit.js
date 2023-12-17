const { currentDate } = require("../../helpers");
const { Water } = require("../../models");
require("dotenv").config();

const waterEdit = async (req, res) => {
  const { id: owner } = req.user;
  const { water } = req.body;

  const today = currentDate();

  const existingWater = await Water.findOne({
    owner,
    "waterAndDate.date": today,
  });

  if (existingWater) {
    const updatedWater = await Water.findOneAndUpdate(
      { owner, "waterAndDate.date": today },
      { $inc: { "waterAndDate.$.water": water } },
      { new: true }
    );
    const addedWater = updatedWater.waterAndDate.find(
      (item) => item.date === today
    );
    res.status(200).json({ data: addedWater });
  } else {
    const newWater = await Water.findOneAndUpdate(
      { owner },
      { $push: { waterAndDate: { water, date: today } } },
      { new: true, upsert: true }
    );

    const addedWater = newWater.waterAndDate.find(
      (item) => item.date === today
    );

    res.status(200).json({ code: 200, data: addedWater });
  }
};

module.exports = waterEdit;
