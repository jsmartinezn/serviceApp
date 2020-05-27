import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import EmpleadoProfile from "./EmpleadoProfile.js";

const Servicios = (props) => {
  const [servicios, setServicios] = useState([]);
  const [perfil, setPerfil] = useState(true);
  const [user, setUser] = useState(null);

  function Solicitar(user) {
    setPerfil(false);
    setUser(user);
  }

  function Librarian() {
    fetch("/getAllE/Librarian")
      .then((res) => res.json())
      .then((quest) => setServicios(quest));
  }

  function Recruiter() {
    fetch("/getAllE/Recruiter")
      .then((res) => res.json())
      .then((quest) => setServicios(quest));
  }

  useEffect(() => {
    fetch("/getAllE")
      .then((res) => res.json())
      .then((quest) => setServicios(quest));
  }, []);

  const renderServicios = () => {
    return (
      <div className="row">
        <Router>
          <div className="col-2">
            <h3>Ocupación</h3>
            <Nav defaultActiveKey="/home" className="flex-column">
              <Link className="nav-link" to="/" onClick={Recruiter}>
                Recruiter
              </Link>
              <Link className="nav-link" to="/" onClick={Librarian}>
                Librarian
              </Link>
            </Nav>
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

                  <div className="contenido">
                    <Switch>
                      <Route path="/solicitar/">
                        <Solicitar />
                      </Route>
                    </Switch>
                  </div>
                </Router>
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
