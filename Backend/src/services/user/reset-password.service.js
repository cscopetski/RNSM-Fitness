import {
  deletePasswordReset,
  getPasswordResetByToken,
  deleteExpiredPasswordTokens,
} from "../../models/password_resetDAO.js";
import { updateUser } from "../../models/userDAO.js";
import bcrypt from "bcrypt";

export async function resetPassword(resetToken, newPassword) {
  return deleteExpiredPasswordTokens().then(async () => {
    if (resetToken !== undefined) {
      return await getPasswordResetByToken(resetToken).then(async (user) => {
        if (user[0]) {
          const salt = await bcrypt.genSalt();
          const hash = await bcrypt.hash(newPassword, salt);
          updateUser(
            {
              password: hash,
            },
            user[0].user_id
          );

          deletePasswordReset(user[0].user_id);
        } else {
          throw new Error("Invalid token");
        }
      });
    } else {
      throw new Error("Invalid token");
    }
  });
}
