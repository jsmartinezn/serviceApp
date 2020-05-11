const MongoClient = require("mongodb");
describe("insert", () => {
  let connection;
  let db;
  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.PASS, {
      useNewUrlParser: true,
    });
    db = await connection.db("service");
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it("insertar documento en coleccion usuario", async () => {
    const test = db.collection("usuario");

    const mock = {
      _id: "some-id",
      username: "luis",
      email: "prueba@prueba.com",
      tipo: "empleado",
    };
    await test.insertOne(mock);

    const insertedMoc = await test.findOne({ _id: "some-id" });
    expect(insertedMoc).toEqual(mock);
  });

  it("insertar documento en coleccion cliente", async () => {
    const test = db.collection("cliente");

    const mock = { _id: "some-id", username: "luis" };
    await test.insertOne(mock);

    const insertedMoc = await test.findOne({ _id: "some-id" });
    expect(insertedMoc).toEqual(mock);
  });

  it("insertar documento en coleccion empleado", async () => {
    const test = db.collection("empleado");

    const mock = {
      _id: "some-id",
      username: "luis",
      ocupacion: "Ingeniero de software",
      anios: "4",
    };
    await test.insertOne(mock);

    const insertedMoc = await test.findOne({ _id: "some-id" });
    expect(insertedMoc).toEqual(mock);
  });

  it("insertar documento en coleccion servicio", async () => {
    const test = db.collection("servicio");

    const cliente = db.collection("cliente");
    const mock = { _id: "some-id-2", username: "luis" };
    await cliente.insertOne(mock);

    const empleado = db.collection("empleado");
    const mock2 = {
      _id: "some-id-2",
      username: "luis 2",
      ocupacion: "Ingeniero de software",
      anios: "4",
    };
    await empleado.insertOne(mock2);

    const insertedCliente = await cliente.findOne({ _id: "some-id-2" });
    const insertedEmpleado = await empleado.findOne({ _id: "some-id-2" });

    const mock3 = {
      _id: "some-id",
      cliente: insertedCliente.username,
      empleado: insertedEmpleado.username,
      descripcion: "",
      estado: "",
      comentario: "",
    };
    await test.insertOne(mock3);

    const insertedMoc = await test.findOne({ _id: "some-id" });
    expect(insertedMoc).toEqual(mock3);
  });
});
