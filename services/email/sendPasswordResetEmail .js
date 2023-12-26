const { User } = require("../../models");
const sendEmail = require("./sendEmail");
const { nanoid } = require("nanoid");

const { FRONTEND_URL } = process.env;

const sendPasswordResetEmail = async (req, res) => {
  const { email } = req.body;

  const resetToken = nanoid();

  await User.findOneAndUpdate(
    { email },
    { $set: { resetToken } },
    { new: true }
  );

  const resetPasswordLink = `${FRONTEND_URL}/create-new-password?token=${resetToken}`;

  const resetEmail = {
    to: email,
    subject: "Password Reset",
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #1e1e1e;
              color: #fff;
              padding: 20px;
              margin: 0;
              text-align: center;
            }
  
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #2a2a2a;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
              padding: 20px;
            }
  
            h2 {
              color: #4CAF50;
            }
  
            p {
              font-size: 16px;
              line-height: 1.6;
              color: #fff;
              margin-bottom: 20px;
            }
            .ii a[href]{
              color:#fff
            }
            a {
              background-color: #4CAF50;
              color: #fff !important;
              width: 138px;
              text-decoration: none;
              padding: 15px 30px;
              display: block;
              margin-left: auto;
              margin-right: auto;
              border-radius: 5px;
              font-size: 18px;
              transition: background-color 0.3s;
            }
  
            a:hover {
              background-color: #45a049;
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
            <p>You have requested to reset your password. Please click on the following link to reset your password:</p>
            <a href="${resetPasswordLink}">Reset Password</a>
            <div class="footer">
              <p>Thank you for using our service.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
  await sendEmail(resetEmail);

  res.json({
    message: "Check your email, please",
  });
};

module.exports = sendPasswordResetEmail;
