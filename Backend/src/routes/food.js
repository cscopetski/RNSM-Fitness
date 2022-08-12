import express from "express";
import {
  deleteFood,
  getAllFood,
  getAllFoodByUserID,
  getAllVisibleFoodByUserID,
  getFoodByID,
  insertFood,
  updateFood,
} from "../models/foodDAO.js";

const router = express.Router();

// Get all foods in db
router.get("/getAll", (req, res) => {
  getAllFood()
    .then((data) => {
      return res.send(data);
    })
    .catch((error) => {
      console.error(error);

      return res.status(400).send("Error getting all foods");
    });
});

// Get all of a user's food
router.get("/getAll-user", (req, res) => {
  const userId = req.user.id;

  getAllVisibleFoodByUserID(userId)
    .then((data) => {
      return res.send(data);
    })
    .catch((error) => {
      console.error(error);

      return res.status(400).send("Error getting all user  food");
    });
});

// Get a specific food from the user's food
router.get("/get/:id", (req, res) => {
  const userId = req.user.id;

  getFoodByID(req.params.id)
    .then((food) => {
      if (food.user_id === userId) {
        return res.send(food);
      } else {
        console.log("Unauthorized user editing food");
        return res.status(403).send("Unauthorized user editing food");
      }
    })
    .catch((error) => {
      console.log(error);

      return res.status(400).send("Error getting food");
    });
});

// Insert a new food into the user's food
router.post("/insert", (req, res) => {
  const userId = req.user.id;
  req.body.user_id = userId;

  insertFood(req.body)
    .then((data) => {
      return res.send(data)
    })
    .catch((error) => {
      console.log(error);

      return res.status(400).send("Error inserting food");
    });
});

// Update a specific food
router.post("/update", (req, res) => {
  updateFood(req.body, req.body.id)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.log(error);

      return res.status(400).send("Error updating food");
    });
});

// Delete a specific food
router.post("/delete", (req, res) => {
  deleteFood(req.body.id)
    .then((data) => {
      return res.json(data)
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send("Failed to delete food");
    });
});

export default router;
