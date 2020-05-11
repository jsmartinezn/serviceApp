const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
  const mu = {},
    hostname = "localhost",
    port = 27017,
    dbName = "service";

  mu.connect = () => {
    // const urls = process.env.PASS;
    const urls = process.env.PASS || `mongodb://${hostname}:${port}`;
    const client = new MongoClient(urls, {
      useUnifiedTopology: true,
    });
    return client.connect();
  };

  mu.passport = {};

  mu.passport.reiniciar = () =>
    mu.connect().then((client) => {
      const collection = client.db(dbName).collection("usuario");
      return collection.drop();
    });

  mu.passport.register = (_name, _email, _tipo) =>
    mu.connect().then((client) => {
      const nuevo = {
        username: _name,
        email: _email,
        tipo: _tipo,
      };
      const usuarioNuevo = client.db(dbName).collection("usuario");
      return usuarioNuevo.insertOne(nuevo).finally(() => client.close());
    });

  mu.passport.find = (query) =>
    mu.connect().then((client) => {
      const reportesCol = client.db(dbName).collection("usuario");
      return reportesCol
        .find({ username: { $ne: "recurrent" }, email: query })
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

  mu.passport.inicializar = () =>
    mu.connect().then((client) => {
      const recurrente = client.db(dbName).collection("usuario");
      const nuevo = {
        username: "recurrent",
        email: "",
        tipo: "recurrent",
      };
      return recurrente.insertOne(nuevo).finally(() => client.close());
    });

  mu.passport.logout = () =>
    mu.connect().then((client) => {
      const recurrente = client.db(dbName).collection("usuario");
      return recurrente
        .updateOne({ username: "recurrent" }, { $set: { email: "" } })
        .finally(() => client.close());
    });

  mu.passport.recurrent = (_email) =>
    mu.connect().then((client) => {
      const recurrente = client.db(dbName).collection("usuario");
      return recurrente
        .updateOne({ username: "recurrent" }, { $set: { email: _email } })
        .finally(() => client.close());
    });

  mu.passport.getRecurrent = () =>
    mu.connect().then((client) => {
      const preguntas = client.db(dbName).collection("usuario");
      return preguntas
        .find({ username: "recurrent" })
        .sort({ timestamp: -1 })
        .limit(1)
        .toArray()
        .finally(() => client.close());
    });

  mu.passport.registerEmpleado = (_username, _ocupacion, _anios) =>
    mu.connect().then((client) => {
      const emp = client.db(dbName).collection("empleado");
      const empleado = {
        username: _username,
        ocupacion: _ocupacion,
        anios: _anios,
      };
      console.log("empleado", empleado);
      return emp.insertOne(empleado).finally(() => client.close());
    });

  mu.passport.registerCliente = (_username) =>
    mu.connect().then((client) => {
      const emp = client.db(dbName).collection("cliente");
      const cliente = {
        username: _username,
      };
      console.log("empleado", cliente);
      return emp.insertOne(cliente).finally(() => client.close());
    });

  mu.passport.getAllE = () =>
    mu.connect().then((client) => {
      const reportesCol = client.db(dbName).collection("empleado");
      return reportesCol
        .find()
        .sort({ timestamp: -1 })
        .limit(20)
        .toArray()
        .finally(() => client.close());
    });

  mu.passport.getAllC = () =>
    mu.connect().then((client) => {
      const reportesCol = client.db(dbName).collection("cliente");
      return reportesCol
        .find()
        .sort({ timestamp: -1 })
        .limit(20)
        .toArray()
        .finally(() => client.close());
    });

  mu.passport.reiniciarE = () =>
    mu.connect().then((client) => {
      const collection = client.db(dbName).collection("empleado");
      return collection.drop();
    });

  mu.passport.reiniciarC = () =>
    mu.connect().then((client) => {
      const collection = client.db(dbName).collection("cliente");
      return collection.drop();
    });

  mu.servicios = {};

  mu.servicios.register = (_usernameC, _usernameE, _descripcion, _estado) =>
    mu.connect().then((client) => {
      const emp = client.db(dbName).collection("servicio");
      const cliente = {
        cliente: _usernameC,
        empleado: _usernameE,
        descripcion: _descripcion,
        estado: _estado,
        comentario: "",
      };
      return emp.insertOne(cliente).finally(() => client.close());
    });

  mu.servicios.getAll = () =>
    mu.connect().then((client) => {
      const reportesCol = client.db(dbName).collection("servicio");
      return reportesCol
        .find()
        .sort({ timestamp: -1 })
        .limit(20)
        .toArray()
        .finally(() => client.close());
    });

  mu.servicios.getEmpleado = (_empleado) =>
    mu.connect().then((client) => {
      const reportesCol = client.db(dbName).collection("servicio");
      return reportesCol
        .find({ empleado: _empleado })
        .sort({ timestamp: -1 })
        .limit(20)
        .toArray()
        .finally(() => client.close());
    });

  mu.servicios.getCliente = (_empleado) =>
    mu.connect().then((client) => {
      const reportesCol = client.db(dbName).collection("servicio");
      return reportesCol
        .find({ cliente: _empleado })
        .sort({ timestamp: -1 })
        .limit(20)
        .toArray()
        .finally(() => client.close());
    });

  mu.servicios.aceptar = (_id_, _comentario) =>
    mu.connect().then((client) => {
      const recurrente = client.db(dbName).collection("servicio");
      return recurrente
        .updateOne(
          { _id: _id_ },
          { $set: { estado: "aceptada", comentario: _comentario } }
        )
        .finally(() => client.close());
    });

  mu.servicios.finalizar = (_id_, _comentario) =>
    mu.connect().then((client) => {
      const recurrente = client.db(dbName).collection("servicio");
      return recurrente
        .updateOne(
          { _id: _id_ },
          { $set: { estado: "finalizada", comentario: _comentario } }
        )
        .finally(() => client.close());
    });

  mu.servicios.calificar = (_id_, _calificacion) =>
    mu.connect().then((client) => {
      const recurrente = client.db(dbName).collection("servicio");
      return recurrente
        .updateOne(
          { _id: _id_ },
          { $set: { estado: "calificada", calificacion: _calificacion } }
        )
        .finally(() => client.close());
    });

  return mu;
}

module.exports = MongoUtils();
