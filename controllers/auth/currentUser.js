const getCurrent = async (req, res) => {
  const { email } = req.user;
  res.json({ email, message: "Token is valid" });
};

module.exports = getCurrent;
