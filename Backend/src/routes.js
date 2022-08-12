import express from "express";
import users from "./routes/users.js";
import daily_log from "./routes/daily_log.js";
import health_profile from "./routes/health_profile.js";
import food from "./routes/food.js";
import daily_food_log from "./routes/daily_food_log.js";
import profiles from "./routes/profiles.js";

import authCheck from "./middleware/authenticate.js";

const router = express.Router();

router.use("/users", users);
router.use("/daily-log", authCheck, daily_log);
router.use("/health-profile", authCheck, health_profile);
router.use("/food", authCheck, food);
router.use("/daily-food-log", authCheck, daily_food_log);
router.use("/profiles", authCheck, profiles);

export default router;
