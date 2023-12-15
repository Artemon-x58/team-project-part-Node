const { currentDate } = require("../../helpers");
const { Water } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const waterChange = async (req, res) => {
  const today = currentDate();

  const decoded = await jwt.verify(req.body.token, SECRET_KEY);
  const owner = decoded.id;
  const { water } = req.body;

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

module.exports = waterChange;
