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

const refreshToken =
  "1//04i79R5RKMNJfCgYIARAAGAQSNwF-L9Ir8clsNtGrgd0yLV-C-HcyQhKTq_sZmv8T_U00etmV6e0lwGWF68QfFTmMZkQydVJhbx8";
const accessToken =
  "ya29.a0AVA9y1uj9vbt-tizMuFSvJam_2YfI9OYPNIWHnqF8It9n_rlLAHVh_k1poLazzVKYJOiHcCroumJ_ZLoRwSJHqTkHvBWfoyfaNeHMZ_320K326RLCaUsMwwQvFkMAHkYxk62cMRpQD-m8ATP0yocpO3yLB-C";
const corpEmail = "rnsmcorp@gmail.com";
const clientID =
  "582212195993-lvl1m13eqhg4e4dmjisadgck6p0rbenu.apps.googleusercontent.com";
const clientSecret = "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";

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
