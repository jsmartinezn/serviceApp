const express = require("express");
const router = express.Router();
const mu = require("../db/MongoUtils.js");
const ObjectID = require("mongodb").ObjectID;

/* GET home page. */

router.post(
  "/registroPregunta",
  require("connect-ensure-login").ensureLoggedIn(),
  (req, res) => {
    mu.preguntas
      .register(req.user.username, req.body.pregunta, req.body.materia)
      .then(res.redirect("/"));
  }
);

router.get("/preguntas", (req, res) => {
  mu.preguntas.getAll().then((usuarios) => res.json(usuarios));
});

router.get("/getPreguntasUsuario", (req, res) => {
  mu.preguntas
    .getByUsuario(req.user.username)
    .then((usuarios) => res.json(usuarios));
});

router.post("/registroRespuesta/:query", (req, res) => {
  //console.log(req.body.respuesta, req.user.username);
  mu.preguntas
    .responder(
      new ObjectID(req.params.query),
      req.body.respuesta,
      req.user.username
    )
    .then(res.redirect("/"));
});

router.get("/getMateria/:query", (req, res) => {
  mu.preguntas
    .getByMateria(req.params.query)
    .then((preguntas) => res.json(preguntas));
});

router.get("/reiniciar", (req, res) => {
  mu.preguntas.reiniciar().then(res.redirect("/preguntas"));
});
module.exports = router;
