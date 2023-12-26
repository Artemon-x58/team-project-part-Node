const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const { User } = require("../../models");
const sendEmail = require("./sendEmail");
const { nanoid } = require("nanoid");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const newPassword = nanoid();
  const hashPassword = await bcrypt.hash(newPassword, 10);
  const user = await User.findOneAndUpdate(
    { email },
    { $set: { token: "", password: hashPassword } },
    { new: true }
  );
  if (!user) {
    throw HttpError(400, "missing required field email");
  }

  const createNewPassword = {
    to: email,
    subject: "Your New Password",
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              color: #333;
              padding: 20px;
            }
  
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
  
            h2 {
              color: #007bff;
            }
  
            p {
              font-size: 16px;
              line-height: 1.6;
            }
  
            .footer {
              margin-top: 20px;
              text-align: center;
              color: #888;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Hello dear user!</h2>
            <p>Your new password is: <strong>${newPassword}</strong></p>
            <p>Please keep this password secure and do not share it with anyone.</p>
            <p>If you did not request a password change, please contact our support team.</p>
            <div class="footer">
              <p>Thank you for using our service.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
  await sendEmail(createNewPassword);

  res.json({
    message: "The new password was created successfully",
  });
};

module.exports = resendVerifyEmail;
