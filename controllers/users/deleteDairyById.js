const { deleteCaloriesToday, sumObjectProperties } = require("../../calories");
const { Diary } = require("../../models");

const deleteDairyById = async (req, res) => {
  const { id: newId } = req.params;
  const { id: owner } = req.user;
  const { meals } = req.body;

  const result = await Diary.findOneAndUpdate(
    { owner },
    { $pull: { [meals]: { _id: newId } } }
  ).exec();

  const filteredEntries = result[meals].filter((item) => item.id === newId);

  const { calories, carbohydrates, protein, fat } =
    sumObjectProperties(filteredEntries);

  deleteCaloriesToday(owner, calories, carbohydrates, protein, fat);

  res.json({ message: "Success" });
};

module.exports = deleteDairyById;
