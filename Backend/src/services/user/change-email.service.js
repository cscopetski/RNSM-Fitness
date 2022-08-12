import {
  getEmailChangeByID,
  insertEmailChange,
  updateEmailChange,
} from "../../models/email_changeDAO.js";
import crypto from "crypto";
import { getUserByEmail } from "../../models/userDAO.js";
import sendMail from "../mail.service.js";
import { getTimestamp } from "../../libs/date.js";

const host = "localhost:3000";

export async function changeEmail(id, newEmail) {
  return await getUserByEmail(newEmail).then(async (user) => {
    if (!user[0]) {
      crypto.randomBytes(48, function (err, buffer) {
        var token = buffer.toString("hex");
        var expiration = getTimestamp(new Date(Date.now() + 3600000)); // 1 hour expiration
        getEmailChangeByID(id)
          .then((change) => {
            if (change) {
              updateEmailChange(
                {
                  new_email: newEmail,
                  email_verification_token: token,
                  email_verification_token_expiration: expiration,
                },
                id
              );
            } else {
              insertEmailChange({
                user_id: id,
                new_email: newEmail,
                email_verification_token: token,
                email_verification_token_expiration: expiration,
              });
            }
          })
          .then(() => {
            var mailOptions = {
              to: newEmail,
              from: "rnsmfitness@gmail.com",
              subject: "RNSM Fitness Email Verification",
              text:
                "Email Change?\n\n" +
                "Verify it here:\n\n" +
                "http://" +
                host +
                "/account/verify-email/" +
                token +
                "\n\n" +
                "If you did not request this, please ignore this email and your email will remain unchanged.\n",
            };

            sendMail(mailOptions);
          });
      });
    } else {
      throw new Error("An account with that email already exists");
    }
  });
}
