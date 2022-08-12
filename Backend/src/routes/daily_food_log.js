import express from "express";
import {
  deleteDailyFood,
  getAllDailyFoodfromUserIDandDate,
  getDailyFoodMacrosByID,
  insertDailyFood,
  updateDailyFood,
} from "../models/daily_foodDAO.js";
import {
  getDailyFoodLogByUserIDandDate,
} from "../models/daily_food_logDAO.js";

const router = express.Router();

// Update a daily food log
router.post("/update", (req, res) => {
  updateDailyFood(req.body, req.body.id)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).send("Failed to deleted food from daily food log");
    });
});

// Delete a daily food log
router.post("/delete", (req, res) => {
  deleteDailyFood(req.body.id)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).send("Failed to deleted food from daily food log");
    });
});

// Ad a user's daily food log
router.post("/add", (req, res) => {
  const id = req.user.id;

  getDailyFoodLogByUserIDandDate(id, req.body.date).then((data) => {
    insertDailyFood({
      daily_food_log_id: data[0].id,
      food_id: req.body.food_id,
      quantity: req.body.quantity,
      meal: (req.body.meal + "").toLowerCase(),
    })
      .then((result) => {
        return res.json(result);
      })
      .catch((err) => {
        console.error(err);
        return res.status(400).send("Failed to add food to daily food log");
      });
  });
});

// Get food macros from a daily food log??
router.get("/get-food/:id", (req, res) => {
  getDailyFoodMacrosByID(req.params.id)
    .then((food) => {
      res.send(food[0]);
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).send("Failed to get daily food");
    });
});

// Get a daily food log
router.get("/get/:date", (req, res) => {
  const id = req.user.id;

  getAllDailyFoodfromUserIDandDate(id, req.params.date)
    .then((foods) => {
      res.send(foods);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("Failed to get daily food log");
    });
});

export default router;
