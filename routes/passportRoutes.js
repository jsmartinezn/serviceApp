const express = require("express");
const router = express.Router();

const mu = require("../db/MongoUtils.js");
const passport = require("passport");

//const env = require("node-env-file");

//env(".env");

router.get("/inicializar", function (req, res) {
  mu.passport.inicializar().then(res.redirect("/"));
});

router.get("/getUser", function (req, res) {
  res.json(req.user || []);
});

router.get("/getAll", function (req, res) {
  mu.passport.getAll().then((user) => res.json(user));
});

router.get("/logout", (req, res) => {
  mu.passport.recurrent("").then(res.redirect("/"));
});

// Initiates basic Sign in with Google flow
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Completes the OAuth flow
router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect(process.env.URL);
  }
);

// Handle removing the user from the session
router.get("/auth/google/logout", (req, res) => {
  req.logout();
  res.redirect("https://accounts.google.com/logout");
});

module.exports = router;
