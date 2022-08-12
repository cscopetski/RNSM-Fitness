import express from "express";
import passport from "passport";
import { makeid } from "../libs/random.js";
import { signupUser } from "../services/user/signup.service.js";

const router = express.Router();


// Login route, authenticates with passport local strategy
router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/auth/login/failed'
  }),
  (req, res) => {
    return res.json(req.user);
  }
);


// Used to check if a user is logged in
router.get("/login/success", (req, res) => {
  const user = req.user;

  console.log(user);

  if (user !== undefined) {
    return res.json(user);
  }

  return undefined;
});


// Login failed
router.get("/login/failed", (req, res) => {
  var errorString = req.query.error;

  if (errorString === undefined) {
    return res.status(401).send("Failed to authenticate");
  }

  return res.status(401).send(errorString);
});

/*
  Log the user out

  TODO: 
    - WE CANNOT REDIRECT A USER IF THEY ARE LOGGED IN VIA LOCAL STRATEGY
    SO IF THERE WAS AN ERROR WE GOTTA HANDLE IT ANOTHER WAY
*/
router.post("/logout", (req, res) => {
  req.session.destroy(function (err) {

    if (err) {
      return res.redirect("/auth/logout/failed?error=Failed to logout user");
    }

    res.clearCookie("connect.sid");
    req.user = null;

    return res.send();
  });
});

// Logout failed endpoint
router.get("/logout/failed", (req, res) => {
  var errorString = req.query.error;

  if (req.session.signupdata !== undefined) {
    req.session.signupdata = null;
  }

  if (errorString === undefined) {
    console.warn(errorString);
    return res.status(400).send("Failed to logout");
  }

  return res.status(400).send(errorString);
});


// Send the user's form data before they begin signing up with google
router.post("/google/signupdata", (req, res) => {
  req.session.signupdata = req.body;

  res.json({ success: true });
});

// Main google authentication route
router.get("/google", passport.authenticate("google"));

// After they authenticate with google, redirect here
router.get(
  "/google/redirect",

  passport.authenticate("google", {
    failureRedirect: "/auth/login/failed",
    keepSessionInfo: true,
  }),

  function (req, res) {

    // User doesnt have an account when attempting to sign in with google
    if (req.user.id === -1) {

      // If the  session does not have has the form data from the sign up page redirect them
      if (req.session.signupdata === undefined) {
        req.logout(function (err) {
          if (err) {
            console.error(err);
            return res.status(400).send(errorString);
          }
        });

        return res.redirect(process.env.FRONTEND_ADDRESS + "/account/create");
      }

      // Sign the user up
      const formData = req.session.signupdata;
      const googleProfile = req.user.profile._json;

      const rID = makeid(12);

      formData.firstname = googleProfile.given_name;
      formData.lastname = googleProfile.family_name;
      formData.email = googleProfile.email;
      formData.password = googleProfile.sub + rID;

      signupUser(formData)
        .then((user) => {
          req.logout(() => {

            req.login({ id: user.id }, function (err) {
              if (err) {
                return next(err);
              }
              return res.redirect(process.env.FRONTEND_ADDRESS + "/auth/redirect");
            });

          });
        })
        .catch((error) => {
          console.log(error);

          req.logout((err) => {
            if (err) {
              return next(err);
            }
          });

          return res.status(401).send("An account with that email already exists");
        });
    } else {
      if (req.session.signupdata !== undefined) {
        // Possibly regenerate cookie and set the passort userobject in it to what it was in cookie before regeneration
        req.session.signupdata = null;
      }

      return res.redirect(process.env.FRONTEND_ADDRESS + "/auth/redirect");
    }
  }
);

export default router;
