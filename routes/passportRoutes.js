const express = require("express");
const router = express.Router();

const mu = require("../db/MongoUtils.js");

router.get("/inicializar", function (req, res) {
  mu.passport.inicializar().then(res.redirect("/"));
});

router.get("/getUser", function (req, res) {
  mu.passport.getRecurrent().then((user) => res.json(user));
});

router.get("/reiniciar", function (req, res) {
  mu.passport.reiniciar();
  mu.passport.reiniciarE();
  mu.passport.reiniciarC().then(res.redirect("/"));
});

router.get("/getAll", function (req, res) {
  mu.passport.getAll().then((user) => res.json(user));
});

router.get("/login/:query", (req, res) => {
  console.log(req.params.query);
  mu.passport.recurrent(req.params.query).then(res.redirect("/"));
});

router.get("/logout", (req, res) => {
  mu.passport.recurrent("").then(res.redirect("/"));
});

module.exports = router;
