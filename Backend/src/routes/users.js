import express from "express";
import {
  getUserByID,
  updateUser,
} from "../models/userDAO.js";
import { signupUser } from "../services/user/signup.service.js";
import { sendForgotPasswordEmail } from "../services/user/forgot-password.service.js";
import { resetPassword } from "../services/user/reset-password.service.js";
import { changePassword } from "../services/user/change-password.service.js";
import { changeEmail } from "../services/user/change-email.service.js";
import { verifyEmail } from "../services/user/verify-email.service.js";
import authCheck from "./../middleware/authenticate.js";

const router = express.Router();

// Get a user's user object from db
router.get("/get", authCheck, (req, res) => {
  const userId = req.user.id;

  getUserByID(userId)
    .then((user) => {
      return res.send(user);
    })
    .catch((error) => {
      return res.status(404).send(error);
    })
});

// Update a user's user object in db
router.post("/update", authCheck, (req, res) => {
  const userId = req.user.id;
  const updateData = req.body;

  updateUser(updateData, userId)
    .then((data) => {
      console.log(data);
      return res.json(data);
    })
    .catch((error) => {
      console.error(error);
      return res.status(400).send("Error updating user");
    });
});

// Signup for an account
router.post("/signup", (req, res) => {
  let FormData = req.body;

  signupUser(FormData)
    .then((user) => {
      req.logout(() => {
        req.login({ id: user.id }, function (err) {
          if (err) {
            console.error(err);
            return next(err);
          }

          console.log(req.user);
          return res.json(user);
        });
      });
    })
    .catch((error) => {
      console.error(error);

      req.session.destroy((err) => {
        if (err) {
          console.error(err);
          return res.status(400).send("Failed to logout user");
        }
      });

      req.session = null;
      return res.status(401).send("An account with that email already exists");
    });
});

// A user forgot their password
router.post("/forgot", (req, res) => {
  sendForgotPasswordEmail(req.body.email)
    .then(() => {
      return res.status(200).send("Successfully sent email");
    })
    .catch((error) => {
      console.error(error);

      return res.status(401).send("An account with that email does not exist");
    });
});

// Reset a user's password
router.post("/reset-password", (req, res) => {
  resetPassword(req.body.resetToken, req.body.password)
    .then(() => {
      return res.status(200).send("Successfully reset password");
    })
    .catch((error) => {
      console.error(error);

      return res.status(401).send("Invalid token");
    });
});

// Change a user's password
router.post("/change-password", authCheck, (req, res) => {
  const id = req.user.id;

  changePassword(id, req.body.currentPassword, req.body.newPassword)
    .then(() => {
      return res.status(200).send("Successfully reset password");
    })
    .catch((error) => {
      console.error(error);

      return res.status(401).send(error);
    });
});

// Change a user's email
router.post("/change-email", authCheck, (req, res) => {
  const id = req.user.id;

  changeEmail(id, req.body.newEmail)
    .then(() => {
      return res
        .status(200)
        .send("Successfully sent email change/verification message");
    })
    .catch((error) => {
      console.error(error);

      return res.status(401).send(error);
    });
});

// Verify a user's email
router.post("/verify-email", (req, res) => {
  verifyEmail(req.body.token)
    .then(() => {
      return res.status(200).send("Successfully verified email");
    })
    .catch((error) => {
      console.error(error);

      return res.status(401).send(error);
    });
});

// Admin endpoints UNUSED RIGHT NOW
/*
router.get("/getAll", (req, res) => {
  getAllUsers()
    .then((data) => {
      return res.send(data);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send("Error getting all users");
    });
});


router.get("/delete/:id", (req, res) => {
  const id = req.user.id;
  if (id == req.params.id) {
    //returns number of rows deleted
    deleteUser(req.params.id).then((data) => res.json(data));
  } else {
    // if the credentials are not correct, return error code 403 "Forbidden"
    res.status(403).send("Unauthorized delete user request");
  }
});*/

export default router;
