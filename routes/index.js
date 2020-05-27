const express = require("express");
const router = express.Router();
const mu = require("../db/MongoUtils.js");
const ObjectID = require("mongodb").ObjectID;

/* GET home page. */

router.post("/registerEmpleado", (req, res) => {
  mu.passport
    .cambiarTipo(req.user[0].email, "Empleado", req.body.username)
    .then(
      mu.passport
        .registerEmpleado(
          req.body.username,
          req.body.ocupacion,
          req.body.experiencia
        )
        .then(res.redirect("/"))
    );
});

router.get("/getEmpleado/:query", function (req, res) {
  mu.passport.getEmpleadoUser(req.params.query).then((user) => res.json(user));
});

router.post("/registerCliente", (req, res) => {
  mu.passport
    .cambiarTipo(req.user[0].email, "Cliente", req.body.username)
    .then(
      mu.passport.registerCliente(req.body.username).then(res.redirect("/"))
    );
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

router.get("/getAllE/:query", function (req, res) {
  mu.passport.getAllEO(req.params.query).then((user) => res.json(user));
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

router.get("/aceptarServicio/:query", (req, res) => {
  //console.log(req.body.respuesta, req.user.username);
  mu.servicios.aceptar(new ObjectID(req.params.query)).then(res.redirect("/"));
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
