import nodemailer from "nodemailer";

/*
EXAMPLE MAIL OPTIONS:
    var mailOptions = {
            to: user.email,
            from: "rnsmfitness@gmail.com",
            subject: "RNSM Fitness Password Reset",
            text: "Yo"
          };
*/

/*
  TODO: Use env vars
*/
const refreshToken = "";
const accessToken = "";
const corpEmail = "";
const clientID = "";
const clientSecret = "";

export default function sendMail(mailOptions) {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: corpEmail,
      clientId: clientID,
      clientSecret: clientSecret,
      refreshToken: refreshToken,
      accessToken: accessToken,
    },
  });

  transporter.sendMail(mailOptions).catch((err) => {
    console.log(err);
  });
}
