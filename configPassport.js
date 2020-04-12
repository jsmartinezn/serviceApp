const passport = require("passport");
const Strategy = require("passport-local").Strategy;

const mu = require("./db/MongoUtils.js");

const bcrypt = require("bcrypt");

passport.use(
  new Strategy(function (username, password, cb) {
    mu.passport.find(username).then((user) => {
      if (user[0] != undefined) {
        bcrypt.compare(password, user[0].password, function (err, result) {
          if (!result) {
            console.log("wrong password");
            return cb(null, false);
          } else {
            console.log("entro");
            return cb(null, user[0]);
          }
        });
      } else {
        console.log("wrong user");
        return cb(null, false);
      }
    });
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user.username);
});

passport.deserializeUser(function (username, cb) {
  mu.passport.find(username).then((user) => {
    if (user[0] != undefined) {
      cb(null, user[0]);
    } else {
      cb(new Error("User serialized not found"));
    }
  });
});

const configurePassport = (app) => {
  // Use application-level middleware for common functionality, including
  // logging, parsing, and session handling.
  app.use(require("body-parser").urlencoded({ extended: true }));
  app.use(
    require("express-session")({
      secret: "sebas loves me",
      resave: false,
      saveUninitialized: false,
    })
  );

  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = configurePassport;
