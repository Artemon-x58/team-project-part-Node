const cloudinary = require("cloudinary").v2;
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
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};
module.exports = updateAvatar;
