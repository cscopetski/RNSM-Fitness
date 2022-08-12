import express from "express";
import multer from "multer";
import fs from "fs";
import { UploadImage, ChangeProfilePicture, DeleteImage, ChangeProfileDescription } from "../services/profile/icon.service.js";
import { makeid } from "../libs/random.js";
import { getProfileByID, } from "../models/profileDAO.js";
import { getUserByID } from "../models/userDAO.js";

const upload = multer({ dest: './uploads' });
const router = express.Router();

// Get a profile object from db
router.get("/get/:id", (req, res) => {
  const userId = req.params.id;

  getUserByID(userId)
    .then((user) => {
      getProfileByID(userId)
        .then((profileData) => {

          const profile = {
            firstname: user.firstname,
            lastname: user.lastname,
            dob: user.dob,
            description: profileData.description,
            icon: profileData.icon,
            joined: profileData.created_at
          };

          return res.send(profile);
        })
        .catch((error) => {
          throw error;
        });
    })
    .catch(error => {
      return res.status(404).send(error);
    });
});

// Change a profile's description
router.post("/change-description", (req, res) => {
  const description = req.body.Description;
  const user = req.user;

  if (description === undefined) {
    return res.status(400).send("Invalid Description");
  }

  ChangeProfileDescription(user.id, description)
    .then(() => {
      return res.send();
    })
    .catch((error) => {
      return res.status(400).send("Error changing profile description: " + error.message);
    });
});

// Change a profile's profile picture
router.post("/changepfp", upload.single('uploaded_file'), (req, res) => {
  const userId = req.user.id;

  if (req.file === undefined) {
    return res.status(404).send("Invalid File");
  }

  const imagePath = req.file.path;

  if (imagePath === undefined) {
    return res.status(404).send("Invalid Image Path");
  }

  const imageBlob = fs.readFileSync(imagePath);
  const imageKey = "User_" + userId + "_ProfileImage_" + makeid(25);

  getProfileByID(userId)
    .then((profile) => {
      let curentImageKey = profile.icon;
      if (curentImageKey !== "default_pfp.jpg") {
        DeleteImage(curentImageKey);

        UploadImage(imageKey, imageBlob)
          .then(() => {
            ChangeProfilePicture(userId, imageKey);
            return res.send(imageKey);
          })
      } else {
        UploadImage(imageKey, imageBlob)
          .then(() => {
            ChangeProfilePicture(userId, imageKey);
            return res.send(imageKey);
          })
      }
    }).catch((error) => {
      console.error(error);
      return res.status(400).send("Uploading Image Failed");
    });

  fs.unlinkSync(imagePath);
});


export default router;
