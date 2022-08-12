import { getUserByEmail } from "../../models/userDAO.js";
import sendMail from "../mail.service.js";
import crypto from "crypto";
import {
  getPasswordResetByID,
  insertPasswordReset,
} from "../../models/password_resetDAO.js";
import { getTimestamp } from "../../libs/date.js";

/*
  This wont work in production!!! Make use of env variables instead
*/
const host = "localhost:3000";

export async function sendForgotPasswordEmail(email) {
  return await getUserByEmail(email).then(async (userdata) => {
    if (userdata[0]) {
      const user = userdata[0];
      crypto.randomBytes(48, function (err, buffer) {
        var token = buffer.toString("hex");
        var expiration = getTimestamp(new Date(Date.now() + 3600000)); // 1 hour expiration
        getPasswordResetByID(user.id)
          .then((reset) => {
            if (reset[0]) {
              updatePasswordReset(
                {
                  password_reset_token: token,
                  password_reset_token_expiration: expiration,
                },
                user.id
              );
            } else {
              insertPasswordReset({
                user_id: user.id,
                password_reset_token: token,
                password_reset_token_expiration: expiration,
              });
            }
          })
          .then(() => {
            var mailOptions = {
              to: user.email,
              from: "rnsmfitness@gmail.com",
              subject: "RNSM Fitness Password Reset",
              text:
                "Forgot your password dummy?\n\n" +
                "Reset it here:\n\n" +
                "http://" +
                host +
                "/account/forgot-password/reset/" +
                token +
                "\n\n" +
                "If you did not request this, please ignore this email and your password will remain unchanged.\n",
            };

            sendMail(mailOptions);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      throw new Error("No account with that email exists");
    }
  });
}
