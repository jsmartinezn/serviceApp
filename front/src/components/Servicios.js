import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import EmpleadoProfile from "./EmpleadoProfile.js";

const Servicios = (props) => {
  const [servicios, setServicios] = useState([]);
  const [perfil, setPerfil] = useState(true);
  const [user, setUser] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [ocupacion, setOcupacion] = useState("all");
  const formRef = useRef();

  function Solicitar(user) {
    setPerfil(false);
    setUser(user);
  }

  useEffect(() => {
    fetch(`/getAllE/${pagina}/${ocupacion}`)
      .then((res) => res.json())
      .then((quest) => setServicios(quest));
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

  const renderServicios = () => {
    return (
      <div className="row">
        <Router>
          <div className="informacion col-3">
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
          <div className="col-8">
            {!perfil ? (
              <EmpleadoProfile user={user}></EmpleadoProfile>
            ) : (
              <div className="servicios row">
                <div className="informacion col-12">
                  <h2> Servicios: </h2>
                  <p>
                    {" "}
                    A continuación se presenta una lista de servicios
                    disponibles. Para solicitar un servicio basta con dar click
                    en el botón solicitar y llenar la información adicional que
                    se encuentra al final de la página.{" "}
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
                        {!props.usuario ? (
                          <span></span>
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-primary btn-card"
                            onClick={(e) => Solicitar(s.username)}
                          >
                            Solicitar
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {servicios.length > 0 ? (
                    <div></div>
                  ) : (
                    <div className="center col12">
                      <div class="alert alert-danger" role="alert">
                        No se encontraron perfiles con la ocupación seleccionada
                      </div>
                    </div>
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
            )}
          </div>
        </Router>
      </div>
    );
  };
  return <div className="Questions">{renderServicios()}</div>;
};

export default Servicios;
