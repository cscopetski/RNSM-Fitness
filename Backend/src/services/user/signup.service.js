import { insertUser, getUserByEmail } from "../../models/userDAO.js";
import { insertHealthProfile } from "../../models/health_profileDAO.js";
import { insertProfile } from "../../models/profileDAO.js";

import bcrypt from "bcrypt";
import {
  calculateAge,
  calculateBMR,
  calculateBMI,
  calculateCaloricGoal,
} from "../../libs/healthstats.js";

export async function signupUser(params) {
  return await getUserByEmail(params.email)
    .then(async (count) => {
      if (!count[0]) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(params.password, salt);

        const age = calculateAge(params.dob);

        const bmr = calculateBMR(
          params.gender,
          params.weight,
          params.height,
          age
        );

        const bmi = calculateBMI(params.weight, params.height);

        const calorie_goal = calculateCaloricGoal(
          bmr,
          params.weightgoal,
          params.activitylevel
        );

        const health_profile_data = {
          height: params.height,
          weight: params.weight,
          initial_weight: params.weight,
          goal_weight: params.goalweight,
          activity_level: params.activitylevel,
          weight_goal: params.weightgoal,
          bmr: bmr,
          bmi: bmi,
          calorie_goal: calorie_goal,
        };

        const profile_data = {
          description: "User has not set a description for their profile yet.",
          icon: "default_pfp.jpg"
        }

        const id = await insertUser({
          firstname: params.firstname || "no-firstname",
          lastname: params.lastname || "no-lastname",
          email: params.email,
          password: hash,
          units: params.units,
          dob: params.dob,
          age: age,
          gender: params.gender,
        }).then(async () => {

          // Get our User's ID
          const user = await getUserByEmail(params.email).then((user) => {
            return user[0];
          });
          const user_id = user.id;

          // Setup our profiles to use the id
          health_profile_data.user_id = user_id;
          profile_data.user_id = user_id;

          // Insert Profiles
          await insertHealthProfile(health_profile_data);
          await insertProfile(profile_data);

          // Return the User object
          return user;
        });

        return id;
      } else {

        throw new Error(
          "An account with that email already exists in the database"
        );

      }

    });
}
