const { currentDate } = require("../../helpers");
const { Weight } = require("../../models");

const weightEdit = async (req, res) => {
  const { id: owner } = req.user;
  const { weight } = req.body;

  const today = currentDate();

  const existingWeight = await Weight.findOne({
    owner,
    "weightAndDate.date": today,
  });

  if (existingWeight) {
    const updatedWeight = await Weight.findOneAndUpdate(
      { owner, "weightAndDate.date": today },
      { $set: { "weightAndDate.$.weight": weight } },
      { new: true }
    );
    const newWeight = updatedWeight.weightAndDate.find(
      (item) => item.date === today
    );
    res.status(200).json({ data: newWeight });
  } else {
    // Если объект не существует, создаем новый
    const updatedWeight = await Weight.findOneAndUpdate(
      { owner },
      { $push: { waterAndDate: { weight, date: today } } },
      { new: true, upsert: true }
    );

    // Находим объект в массиве с нужной датой
    const newWeight = updatedWeight.waterAndDate.find(
      (item) => item.date === today
    );

    res.status(201).json({ data: newWeight });
  }
};

module.exports = weightEdit;
