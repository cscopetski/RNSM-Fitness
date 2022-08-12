import express from "express";
import { getAllDailyFoodfromUserIDandDate } from "../models/daily_foodDAO.js";
import {
  getDailyLogByID,
  updateDailyLog,
  createDailyLog,
} from "../models/daily_logDAO.js";
import { getHealthProfileByID, updateHealthProfile } from "../models/health_profileDAO.js";

const router = express.Router();

// Update a user's daily log
router.post("/update", (req, res) => {
  const id = req.user.id;

  //returns number of rows updated
  if (req.body.weight_results !== undefined) {
    updateHealthProfile(
      {
        weight: req.body.weight_results,
      },
      id
    );
    updateDailyLog(req.body, id, req.body.date).then((data) => {
      return res.json(data);
    });
  } else {
    return res.status(403).send("Unauthorized update daily_log request");
  }
});

// Get a user's daily log for a specific date
router.get("/get/:date", (req, res) => {
  const id = req.user.id;

  getAllDailyFoodfromUserIDandDate(id, req.params.date)
    .then((foods) => {
      const foodTotal = {
        protein: 0,
        fat: 0,
        carbs: 0,
        calories: 0,
      };

      foods.forEach((food) => {
        foodTotal.protein += Math.round(food.protein * food.quantity);
        foodTotal.fat += Math.round(food.fat * food.quantity);
        foodTotal.carbs += Math.round(food.carbs * food.quantity);
        foodTotal.calories += Math.round(food.calories * food.quantity);
      });

      updateDailyLog(
        {
          protein_results: foodTotal.protein,
          fat_results: foodTotal.fat,
          carb_results: foodTotal.carbs,
          calorie_results: foodTotal.calories,
        },
        id,
        req.params.date
      )
        .then(() => {
          getDailyLogByID(id, req.params.date)
            .then((data) => {
              if (data === undefined) {
                getHealthProfileByID(id).then((health_data) => {
                  const user = health_data;
                  const fields = {
                    user_id: id,
                    date: req.params.date,
                    weight_results: user.weight,
                    weight_goal: user.goal_weight,
                    protein_results: 0,
                    protein_goal: user.protein_goal_ratio,
                    fat_results: 0,
                    fat_goal: user.fat_goal_ratio,
                    carb_results: 0,
                    carb_goal: user.carb_goal_ratio,
                    calorie_results: 0,
                    calorie_goal: user.calorie_goal,
                  };
                  createDailyLog(fields).then((daily_log) => {
                    return res.send(fields);
                  });
                });
              } else {
                return res.send(data);
              }
            })
            .catch((err) => {
              console.log(err);
              return res.status(400).send("Error updating daily log before fetching");
            });
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).send("Error updating daily log before fetching");
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send("Error updating daily log before fetching");
    });
});

export default router;
