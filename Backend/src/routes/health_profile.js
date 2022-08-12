import express from "express";
import { getHealthProfileByID, updateHealthProfile } from "../models/health_profileDAO.js";

const router = express.Router();

// Update user's health profile
router.post("/update", (req, res) => {
  const id = req.user.id;

  //returns number of rows updated
  updateHealthProfile(req.body, id)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).send("Error updating health profile");
    });
});

// Get user's health profile object from db
router.get("/get", (req, res) => {
  const id = req.user.id;

  console.log(id);

  getHealthProfileByID(id).then((healthProfile) => {
    return res.send(healthProfile);
  });
});

export default router;
