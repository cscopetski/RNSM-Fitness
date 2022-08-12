import { getUserByID, updateUser } from "../../models/userDAO.js";
import bcrypt from "bcrypt";

export async function changePassword(id, currentPassword, newPassword) {
  return await getUserByID(id, "*").then(async (user) => {
    if (user) {
      const result = await bcrypt.compare(currentPassword, user.password);

      if (result == true) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(newPassword, salt);
        updateUser(
          {
            password: hash,
          },
          user.id
        );
      } else {
        throw new Error("Invalid Password");
      }
    } else {
      throw new Error("Invalid User");
    }
  });
}
