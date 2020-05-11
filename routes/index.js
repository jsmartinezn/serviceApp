const express = require("express");
const router = express.Router();
const mu = require("../db/MongoUtils.js");
const ObjectID = require("mongodb").ObjectID;

/* GET home page. */

router.get("/", function (req, res) {
  mu.passport.getRecurrent().then((user) => {
    if (user[0] != undefined)
      res.render("index", { title: user[0].username || "usuario" });
    res.render("index", { title: "vacio" });
  });
});

router.get("/profile", function (req, res) {
  mu.passport.getRecurrent().then((user) => {
    mu.passport.find(user[0].email).then((user2) => {
      res.json(user2);
    });
  });
});

router.post("/registerEmpleado", (req, res) => {
  mu.passport.getRecurrent().then((users) => {
    mu.passport
      .register(req.body.username, users[0].email, "Empleado")
      .then(
        mu.passport.registerEmpleado(
          req.body.username,
          req.body.ocupacion,
          req.body.experiencia
        )
      )
      .then(res.redirect("/"));
  });
});

router.post("/registerCliente", (req, res) => {
  mu.passport.getRecurrent().then((users) => {
    console.log("aaa", users[0].email);
    mu.passport
      .register(req.body.username, users[0].email, "Cliente")
      .then(mu.passport.registerCliente(req.body.username))
      .then(res.redirect("/"));
  });
});

router.post("/registerCliente", (req, res) => {
  mu.passport.getRecurrent().then((users) => {
    console.log("aaa", users[0].email);
    mu.passport
      .register(req.body.username, users[0].email, "Cliente")
      .then(mu.passport.registerCliente(req.body.username))
      .then(res.redirect("/"));
  });
});

router.post("/registroServicio", (req, res) => {
  mu.servicios
    .register(
      req.body.usernameC,
      req.body.usernameE,
      req.body.especificacion,
      "solicitado"
    )
    .then(res.redirect("/"));
});

router.get("/getAllE", function (req, res) {
  mu.passport.getAllE().then((user) => res.json(user));
});

router.get("/getServicios", function (req, res) {
  mu.servicios.getAll().then((user) => res.json(user));
});

router.get("/getServicios/:query", function (req, res) {
  mu.servicios.getEmpleado(req.params.query).then((user) => res.json(user));
});

router.get("/getServiciosC/:query", function (req, res) {
  mu.servicios.getCliente(req.params.query).then((user) => res.json(user));
});

router.post("/aceptarServicio", (req, res) => {
  //console.log(req.body.respuesta, req.user.username);
  mu.servicios
    .aceptar(new ObjectID(req.body.id), req.body.comentarios)
    .then(res.redirect("/"));
});

router.post("/finalizarServicio", (req, res) => {
  console.log(req.body.comentarios);
  mu.servicios
    .finalizar(new ObjectID(req.body.id), req.body.comentarios)
    .then(res.redirect("/"));
});

router.post("/calificarServicio", (req, res) => {
  console.log(req.body.comentarios);
  mu.servicios
    .calificar(new ObjectID(req.body.id), req.body.calificacion)
    .then(res.redirect("/"));
});

module.exports = router;
