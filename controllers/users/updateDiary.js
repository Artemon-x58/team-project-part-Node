const { HttpError } = require("../../helpers");
const { Diary } = require("../../models");

const updateDiary = async (req, res) => {
  const { id: newId } = req.params;
  const { id: owner } = req.user;
  const { meals } = req.body;

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
    },
    { new: true }
  ).exec();
  if (!result) {
    throw HttpError(404, "Diary not found");
  }

  const newProduct = result[meals][0];

  res.json({ newProduct });
};

module.exports = updateDiary;
