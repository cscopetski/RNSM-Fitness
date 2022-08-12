import { getUserByEmail } from "../../models/userDAO.js";
import bcrypt from "bcrypt";

export async function loginUser(email, password) {
  return await getUserByEmail(email).then(async (user) => {
    if (user[0]) {
      const result = await bcrypt.compare(password, user[0].password);
      if (result == true) {
        return user[0];
      } else {
        throw new Error("Invalid Password");
      }
    } else {
      throw new Error("No account with that email exists");
    }
  });
}
