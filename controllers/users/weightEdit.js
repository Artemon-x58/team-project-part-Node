const { currentDate, HttpError } = require("../../helpers");
const { Weight, User } = require("../../models");
const { updateWaterValue } = require("../../water");

const weightEdit = async (req, res) => {
  const { id: owner } = req.user;
  const { weight } = req.body;

  const today = currentDate();

  const user = await User.findByIdAndUpdate(
    owner,
    { weight },
    {
      new: true,
    }
  ).exec();
  if (!user) {
    throw HttpError(404);
  }

  updateWaterValue(user.id, user.weight, user.kef);

  const existingWeight = await Weight.findOne({
    owner,
    "weightAndDate.date": today,
  }).exec();

  if (!existingWeight) {
    throw HttpError(404);
  }

  if (existingWeight) {
    const updatedWeight = await Weight.findOneAndUpdate(
      { owner, "weightAndDate.date": today },
      { $set: { "weightAndDate.$.weight": weight } },
      { new: true }
    ).exec();
    const newWeight = updatedWeight.weightAndDate.find(
      (item) => item.date === today
    );
    res.status(200).json({ data: newWeight });
  } else {
    // Если объект не существует, создаем новый
    const updatedWeight = await Weight.findOneAndUpdate(
      { owner },
      { $push: { weightAndDate: { weight, date: today } } },
      { new: true, upsert: true }
    ).exec();

    // Находим объект в массиве с нужной датой
    const newWeight = updatedWeight.weightAndDate.find(
      (item) => item.date === today
    );

    res.status(201).json({ data: newWeight });
  }
};

module.exports = weightEdit;
