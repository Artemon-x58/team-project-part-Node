const { HttpError } = require("../../helpers");
const { User } = require("../../models");
const { updateWaterValue } = require("../../water");
const { updateWeightValue } = require("../../weight");

const updateUserSetting = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  }).exec();
  if (!user) {
    throw HttpError(404);
  }
  const { id, weight, kef } = user;
  updateWaterValue(id, weight, kef);
  updateWeightValue(id, weight);
  res.status(200).send({ code: 200, user });
};

//   const { id } = req.user;

//   const validSubscriptions = ["startert", "pro", "business"];
//   if (!validSubscriptions.includes(subscription)) {
//     throw HttpError(400, "Invalid subscription value");
//   }

//   const updatedUser = await User.findByIdAndUpdate(
//     id,
//     { subscription },
//     { new: true }
//   );

//   if (!updatedUser) {
//     throw HttpError(400, "User not found");
//   }
//   res.json({
//     user: {
//       email: req.user.email,
//       subscription: updatedUser.subscription,
//     },
//   });
// };

module.exports = updateUserSetting;
