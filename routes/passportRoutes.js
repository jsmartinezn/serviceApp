const express = require("express");
const router = express.Router();
const passport = require("passport");
const mu = require("../db/MongoUtils.js");
const bcrypt = require("bcrypt");

// Define routes.

router.get("/login", function (req, res) {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

router.get("/register", function (req, res) {
  res.render("register");
});

router.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    mu.passport.register(req.body.username, hash);
    res.redirect("/");
  });
});

router.get("/logout", function (req, res) {
  req.logout();
  res.json({ ok: true });
});

router.get(
  "/profile",
  require("connect-ensure-login").ensureLoggedIn(),
  function (req, res) {
    res.render("profile", { user: req.user });
  }
);

router.get("/getUser", (req, res) => {
  return res.json(req.user || null);
});

router.get("/getUsers", (req, res) => {
  mu.passport.getAll().then((resp) => res.json(resp));
});

module.exports = router;
