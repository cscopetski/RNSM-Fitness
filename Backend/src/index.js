import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import http from "http";
import router from "./routes.js";
import auth from "./routes/auth.js";
import cors from "cors";
import session from "express-session";
import KnexSessionStore from "connect-session-knex";
import cookieParser from "cookie-parser";
import database from "../knex/knex.js";
import helmet from "helmet";
import passportConfig from "./config/passport-setup.js";
import fs from 'fs';
import https from 'https';

// Create our app variable
const app = express();

// Setup our Knex database
const knexSession = KnexSessionStore(session);

const store = new knexSession({
  knex: database,
});


// Helmet security
app.use(helmet());

app.use(cors({
  credentials: true,
  origin: process.env.CORS_ORIGIN_URL,
}));

// Allows us to read json data from requests
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Use cors 
app.use(cookieParser("v6h23871rvh78123r801t71trv7"));

// Use cookies and session tracking
let secure = false;

if (process.env.NODE_ENV === 'production') {
  secure = true;
}


app.use(
  session({
    secret: "v6h23871rvh78123r801t71trv7",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: secure,
      //cookie expires in 30 days
      maxAge: 1000 * 30 * 24 * 60 * 60,
    },
    store: store,
  })
);

// Initialize our passport authentication 
app.use(passport.initialize());
app.use(passport.session());

passportConfig();

// Setup our routes
app.use("/auth", auth);
app.use("/api", router);

// Start the server
let server = http.createServer(app);

if (process.env.NODE_ENV === 'production') {
  var certificate = fs.readFileSync('/etc/letsencrypt/live/rnsm.fit/fullchain.pem');
  var privateKey = fs.readFileSync('/etc/letsencrypt/live/rnsm.fit/privkey.pem');

  server = https.createServer({
    key: privateKey,
    cert: certificate
  }, app).listen(process.env.PORT);

  console.log(`Listening on port ${process.env.PORT}`);

} else {
  server.listen(process.env.PORT, () => console.log("Server started on port " + process.env.PORT));
}



console.log("Running in a " + process.env.NODE_ENV + " environment");

export default server;
