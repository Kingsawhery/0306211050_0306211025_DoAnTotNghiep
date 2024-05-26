import Mailjet from "node-mailjet";

const sendForgotPassword = (email, host, resetLink) => {
  const mailjet = Mailjet.apiConnect(
    process.env.MJ_API_KEY,
    process.env.MJ_API_SECRET
  );
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "haotaplamdev1603@gmail.com",
          Name: "shopdunk",
        },
        To: [
          {
            Email: email,
            Name: "Nguyễn Nhật Hào",
          },
        ],
        Subject: "[Shopdunk] Reset password",
        HTMLPart: `<p> Hi Nguyễn Nhật Hào </p>,
                    </br>
                    <p>You recently requested to reset the password for your ${host} account.</p> 
                    </br>
                    <p>Click the link below to proceed.</p>
                    </br>
                    <p><a href="${resetLink}">Reset Password</a></p>
                    </br>
                    <p>If you did not request a password reset, please ignore this email or reply to let us know.</p> 
                    <p>This password reset link is only valid for the next 30 minutes.</p>
                    </br>
                    <p>Thanks</p>`,
      },
    ],
  });

  request
    .then((result) => {
      console.log(JSON.stringify(result.body.Messages));
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

module.exports = {
  sendForgotPassword,
};
