import {
  deleteEmailChange,
  deleteExpiredEmailTokens,
  getEmailChangeByToken,
} from "../../models/email_changeDAO.js";
import { updateUser } from "../../models/userDAO.js";

export async function verifyEmail(token) {
  return await deleteExpiredEmailTokens().then(async () => {
    await getEmailChangeByToken(token).then((data) => {
      if (data) {
        let user = data;
        updateUser(
          {
            email: user.new_email,
          },
          user.user_id
        ).then(() => {
          deleteEmailChange(user.user_id);
        });
      } else {
        throw new Error("Invalid Reset Token");
      }
    });
  });
}
