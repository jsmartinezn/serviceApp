const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

function MongoUtils() {
  const mu = {},
    hostname = "localhost",
    port = 27017,
    dbName = "foro";

  mu.connect = () => {
    const urls = process.env.PASS;
    //const urls = `mongodb://${server}:${puerto}`;
    const client = new MongoClient(urls, {
      useUnifiedTopology: true,
    });
    return client.connect();
  };

  mu.preguntas = {};

  mu.preguntas.register = (_username, _pregunta, _materia) =>
    mu.connect().then((client) => {
      const nueva = {
        username: _username,
        pregunta: _pregunta,
        materia: _materia,
        respuestas: [],
      };
      const preguntaNuevo = client.db(dbName).collection("pregunta");
      return preguntaNuevo.insertOne(nueva).finally(() => client.close());
    });

  mu.preguntas.getAll = () =>
    mu.connect().then((client) => {
      const reportesCol = client.db(dbName).collection("pregunta");
      return reportesCol
        .find()
        .sort({ timestamp: -1 })
        .limit(20)
        .toArray()
        .finally(() => client.close());
    });

  mu.preguntas.getByUsuario = (_username) =>
    mu.connect().then((client) => {
      const reportesCol = client.db(dbName).collection("pregunta");
      return reportesCol
        .find({ username: _username })
        .sort({ timestamp: -1 })
        .limit(20)
        .toArray()
        .finally(() => client.close());
    });

  mu.preguntas.getByMateria = (_materia) =>
    mu.connect().then((client) => {
      const preguntas = client.db(dbName).collection("pregunta");
      return preguntas
        .find({ materia: _materia })
        .sort({ timestamp: -1 })
        .limit(20)
        .toArray()
        .finally(() => client.close());
    });

  mu.preguntas.responder = (_id, _respuesta, _usuario) =>
    mu.connect().then((client) => {
      console.log("id", _id);
      const respuestaActual = client.db(dbName).collection("pregunta");
      return respuestaActual
        .updateOne(
          { _id: _id },
          {
            $push: { respuestas: { respuesta: _respuesta, usuario: _usuario } },
          }
        )
        .finally(() => client.close());
    });

  mu.preguntas.reiniciar = () =>
    mu.connect().then((client) => {
      const collection = client.db(dbName).collection("pregunta");
      return collection.drop();
    });

  mu.passport = {};

  mu.passport.register = (_name, _password) =>
    mu.connect().then((client) => {
      const nuevo = {
        username: _name,
        password: _password,
      };
      const usuarioNuevo = client.db(dbName).collection("usuario");
      return usuarioNuevo.insertOne(nuevo).finally(() => client.close());
    });

  mu.passport.find = (query) =>
    mu.connect().then((client) => {
      const reportesCol = client.db(dbName).collection("usuario");
      return reportesCol
        .find({ username: query })
        .sort({ timestamp: -1 })
        .limit(20)
        .toArray()
        .finally(() => client.close());
    });

  mu.passport.getAll = () =>
    mu.connect().then((client) => {
      const reportesCol = client.db(dbName).collection("usuario");
      return reportesCol
        .find()
        .sort({ timestamp: -1 })
        .limit(20)
        .toArray()
        .finally(() => client.close());
    });

  return mu;
}

module.exports = MongoUtils();
