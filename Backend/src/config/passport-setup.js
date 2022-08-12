import GoogleStrategy from "passport-google-oauth20";
import passport from "passport";
import LocalStrategy from 'passport-local';
import { getUserByEmail, getUserByID } from "../models/userDAO.js";
import { loginUser } from "../services/user/login.service.js";

const environment_variables = process.env;

export default function passportConfig() {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, cb) => {

      loginUser(email, password).then((user) => {
        return cb(null, user);

      }).catch((error) => {
        return cb(null, false, { message: error })
      });

    })
  );

  passport.use("google", new GoogleStrategy(
    {
      clientID: environment_variables.GOOGLE_CLIENT_ID,
      clientSecret: environment_variables.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
      scope: ["profile", "email"],
      state: true,
    },

    (accessToken, refreshToken, profile, done) => {
      const profileEmail = profile.emails[0].value;

      getUserByEmail(profileEmail).then((user) => {
        if (user.length == 0) {
          console.log(profile);
          // User does not exist - create new account
          done(null, { id: -1, profile: profile });
        } else {
          console.log(user[0]);
          // User already exists, return their user object
          done(null, user[0]);
        }
      });
    }

  )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // deserialize the cookieUserId to user in the database
  passport.deserializeUser((id, done) => {
    if (id == -1) {
      done(null, { id: -1 });
      return;
    }
    getUserByID(id)
      .then((user) => {
        done(null, user);
      })
      .catch((e) => {
        console.log(e);
        done(new Error("Failed to deserialize an user"));
      });
  });
};
