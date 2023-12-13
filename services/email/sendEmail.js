const nodemailer = require("nodemailer");
require("dotenv").config();

const { UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 2525,
  secure: true,
  auth: {
    user: "lera.maiorova@ukr.net",
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "lera.maiorova@ukr.net" };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
