const { deleteCaloriesToday, addCaloriesToday } = require("../../calories");
const { HttpError, currentDate } = require("../../helpers");
const { Diary } = require("../../models");

const updateDiaryById = async (req, res) => {
  const { id: newId } = req.params;
  const { id: owner } = req.user;
  const { meals, calories, carbohydrates, protein, fat } = req.body;
  const date = currentDate();

  const result = await Diary.findOneAndUpdate(
    {
      owner,
      [`${meals}`]: {
        $elemMatch: { _id: newId },
      },
    },
    {
      $set: {
        [`${meals}.$`]: req.body,
      },
    }
  ).exec();
  if (!result) {
    throw HttpError(404, "Diary not found");
  }
  const newProduct = result[meals][0];

  deleteCaloriesToday(
    owner,
    newProduct.calories,
    newProduct.carbohydrates,
    newProduct.protein,
    newProduct.fat
  );
  addCaloriesToday(owner, calories, carbohydrates, protein, fat, date);

  res.json({ code: 200, message: "Success" });
};

module.exports = updateDiaryById;
