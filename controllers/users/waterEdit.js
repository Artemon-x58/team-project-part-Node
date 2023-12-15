const { currentDate } = require("../../helpers");
const { Water } = require("../../models");
require("dotenv").config();

const waterEdit = async (req, res) => {
  const { id: owner } = req.user;
  const { water } = req.body;

  const today = currentDate();

  // Проверяем, существует ли объект с указанной датой
  const existingWater = await Water.findOne({
    owner,
    "waterAndDate.date": today,
  });

  if (existingWater) {
    // Если объект существует, приплюсовываем воду
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
    // Если объект не существует, создаем новый
    const newWater = await Water.findOneAndUpdate(
      { owner },
      { $push: { waterAndDate: { water, date: today } } },
      { new: true, upsert: true }
    );

    // Находим объект в массиве с нужной датой
    const addedWater = newWater.waterAndDate.find(
      (item) => item.date === today
    );

    res.status(201).json({ data: addedWater });
  }
};

module.exports = waterEdit;
