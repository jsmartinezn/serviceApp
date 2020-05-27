const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const mu = require("./db/MongoUtils.js");
//const env = require("node-env-file");

//env(".env");

const configureAuthGoogle = (app) => {
  // Configure the Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        callbackURL: "/auth/google/callback",
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      },
      (accessToken, refreshToken, profile, done) => {
        console.log("ayuda", profile);
        // Check if user already exists in the DB
        mu.passport.find(profile._json.email).then((currentUser) => {
          if (currentUser[0]) {
            // Already have the user
            console.log("User is", currentUser[0].email);
            done(null, currentUser[0]);
          } else {
            // If not, create a new user in the DB
            mu.passport
              .create("Pendiente", profile._json.email, "Pendiente")
              .then((newUser) => {
                console.log("New user created", newUser.ops[0]);
                done(null, newUser.ops[0]);
              });
          }
        });
      }
    )
  );

  // Whe using Passport's session functionality, you need to tell passport
  // how to serialize/deserialize user object to the session store
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser((email, done) => {
    mu.passport.find(email).then((user) => {
      done(null, user);
    });
  });

  app.use(
    session({
      cookie: {},
      resave: false,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = configureAuthGoogle;
