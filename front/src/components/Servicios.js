import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import EmpleadoProfile from "./EmpleadoProfile.js";

const Servicios = (props) => {
  const [servicios, setServicios] = useState([]);
  const [perfil, setPerfil] = useState(true);
  const [user, setUser] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [ocupacion, setOcupacion] = useState("all");
  const formRef = useRef();
  const formRef2 = useRef();

  const [carga, setCarga] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setUser(null);
  };
  const handleShow = () => setShow(true);

  function Solicitar(user) {
    setPerfil(false);
    fetch(`getEmpleado/${user}`)
      .then((res) => res.json())
      .then((quest) => setUser(quest[0]));
    handleShow();
  }

  useEffect(() => {
    setCarga(false);
    fetch(`/getAllE/${pagina}/${ocupacion}`)
      .then((res) => res.json())
      .then((quest) => {
        setCarga(true);
        setServicios(quest);
      });
  }, [ocupacion, pagina]);

  const anterior = (evt) => {
    evt && evt.preventDefault();
    setPagina(pagina - 1);
  };

  const siguiente = (evt) => {
    evt && evt.preventDefault();
    setPagina(pagina + 1);
  };

  const filtrarOcupacion = (evt) => {
    evt && evt.preventDefault();
    const formData = new FormData(formRef.current);
    const filtro = formData.get("filtro");
    setOcupacion(filtro);
    setPagina(1);
  };

  const verTodo = (evt) => {
    evt && evt.preventDefault();
    setOcupacion("all");
    setPagina("1");
  };

  const createService = (evt) => {
    evt && evt.preventDefault();
    const formData = new FormData(formRef2.current);
    const usernameE = formData.get("usernameE");
    const usernameC = formData.get("usernameC");
    const especificacion = formData.get("especificacion");
    alert(usernameE, usernameC, especificacion);
    const dato = {
      usernameE: usernameE,
      usernameC: usernameC,
      especificacion: especificacion,
    };
    fetch("/registroServicio", {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dato),
    })
      .then((res) => res.json())
      .then((pregu) => {
        console.log(pregu);
      });
    handleClose();
  };

  const renderServicios = () => {
    return (
      <div className="row">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Detalle del usuario:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {user ? (
              <div className="row">
                <div className="itemModal col-12">
                  <div className="col-12 Icon">
                    <i className="fa fa-user"></i>
                  </div>
                </div>
                <div className="itemModal col-12">
                  <div className="col-6">Nombre de usuario:</div>
                  <div className="col-6 izq"> {user.username}</div>
                </div>
                <div className="itemModal col-12">
                  <div className="col-6">Ocupacion:</div>
                  <div className="col-6 izq"> {user.ocupacion}</div>
                </div>
                <div className="itemModal col-12">
                  <div className="col-6">Años de experiencia:</div>
                  <div className="col-6 izq"> {user.anios}</div>
                </div>
                <div className="itemModal col-12">
                  <div className="col-6">Telefono:</div>
                  <div className="col-6 izq"> {user.telefono}</div>
                </div>
                <div className="itemModal col-12">
                  <div className="col-6">Descripción:</div>
                  <div className="col-6 izq">{user.descripcion}</div>
                </div>
                <div className="itemModal col-12">
                  <div className="col-12">
                    <h5>Solicita el servicio aquí:</h5>
                    <form
                      ref={formRef2}
                      onSumbit={createService}
                      action="/registroServicio"
                      method="post"
                    >
                      <div className="form-group">
                        <label>Usuario del empleado:</label>
                        <input
                          readOnly={true}
                          className="form-control"
                          type="text"
                          name="usernameE"
                          defaultValue={user.username}
                        />
                      </div>
                      <div className="form-group">
                        <label>Usuario del cliente:</label>
                        <input
                          readOnly={true}
                          className="form-control"
                          type="text"
                          name="usernameC"
                          defaultValue={props.usuario.username}
                        />
                      </div>
                      <div className="form-group">
                        <label>Especificaciones:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="especificacion"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div>Espere un momento mientras se carga la información</div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-danger" onClick={handleClose}>
              Cerrar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={createService}
            >
              Solicitar
            </button>
          </Modal.Footer>
        </Modal>
        <Router>
          <div className="col-8">
            <div className="servicios row">
              <div className="informacion col-12">
                <h2> Servicios: </h2>
                <p>
                  {" "}
                  A continuación se presenta una lista de servicios disponibles.
                  Para solicitar un servicio basta con dar click en el botón
                  solicitar y llenar la información adicional que se encuentra
                  al final de la página.{" "}
                </p>
              </div>
              <Router>
                {servicios.map((s, i) => (
                  <div className="servicio col-4" key={"question " + i}>
                    <div className="fit">
                      <div>
                        <h5>Usuario: {s.username}</h5>
                        <h6>Ocupación: {s.ocupacion}</h6>
                      </div>
                      {!props.usuario ||
                      s.username == props.usuario.username ? (
                        <span></span>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-primary btn-card"
                          onClick={(e) => Solicitar(s.username)}
                          //onClick={handleShow}
                        >
                          Solicitar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {carga ? (
                  <div></div>
                ) : (
                  <div className="center col12">
                    <div class="alert alert-secondary" role="alert">
                      Espere un momento mientras se cargan los resultados
                    </div>
                  </div>
                )}
                {servicios.length == 0 && carga ? (
                  <div className="center col12">
                    <div class="alert alert-danger" role="alert">
                      No se encontraron perfiles con la ocupación seleccionada
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}

                <div className="contenido">
                  <Switch>
                    <Route path="/solicitar/">
                      <Solicitar />
                    </Route>
                  </Switch>
                </div>
              </Router>
              <div className="paginacion col-12">
                <div className="col-12">
                  <span>Mostrando resultados de la página: {pagina}</span>
                </div>

                <div className="pag col-12">
                  {pagina > 1 ? (
                    <button className="btn btn-primary" onClick={anterior}>
                      Anterior
                    </button>
                  ) : (
                    <button
                      disabled
                      className="btn btn-secondary"
                      onClick={anterior}
                    >
                      Anterior
                    </button>
                  )}
                  {servicios.length == 21 ? (
                    <button className="btn btn-primary" onClick={siguiente}>
                      Siguiente
                    </button>
                  ) : (
                    <button
                      disabled
                      className="btn btn-secondary"
                      onClick={siguiente}
                    >
                      Siguiente
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-1"></div>
          <div className="informacion fixed col-3">
            <h3>Filtrar por Ocupación</h3>
            <p>
              Puedes filtrar los resultados escribiendo la una palabra clave de
              la ocupación que te interese. Con el botón FILTRAR obtendrás los
              resultados que se adapten a tu condición.{" "}
            </p>
            <div className="row">
              <div className="col-12">
                <form id="formSearch" ref={formRef}>
                  <div className="form-group cien">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Filtrar por Ocupación"
                      name="filtro"
                    />
                  </div>
                  <div className="form-group">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={filtrarOcupacion}
                    >
                      Filtrar
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="row">
              <div className=" informacion col-12">
                <p>
                  {" "}
                  Si deseas ver de nuevo todas las ocupaciones presiona el
                  siguiente botón{" "}
                </p>
                <div className="form-group">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={verTodo}
                  >
                    Ver todo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  };
  return <div className="Questions">{renderServicios()}</div>;
};

export default Servicios;
