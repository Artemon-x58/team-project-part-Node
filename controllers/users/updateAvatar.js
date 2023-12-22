const cloudinary = require("cloudinary").v2;
const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload } = req.file;

  const cloudinaryResult = await cloudinary.uploader.upload(tempUpload, {
    folder: "avatars",
    width: 150,
    height: 150,
    crop: "fill",
  });

  const avatarURL = cloudinaryResult.secure_url;
  const result = await User.findByIdAndUpdate(_id, { avatarURL });
  if (!result) {
    throw HttpError(404, "User not found");
  }
  res.json({
    avatarURL,
  });
};
module.exports = updateAvatar;
