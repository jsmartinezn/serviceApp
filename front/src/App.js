import React, { useState, useEffect } from "react";
import Footer from "./footer.js";
import Register from "./components/Register.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Servicio from "./components/Servicios.js";
import Solicitudes from "./components/Solicitudes.js";

const App = () => {
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState("");
  const [servicios, setServicios] = useState([]);
  const [solicitud, setSolicitudes] = useState([]);

  const setUpWebSocket = () => {
    const socket = new WebSocket("ws://localhost:3001");
    socket.onopen = () => {
      socket.onmessage = (msg) => {
        setServicios(JSON.parse(msg.data));
      };
    };
  };

  useEffect(() => {
    setUpWebSocket();
    fetch("/getUser")
      .then((res) => res.json())
      .then((user) => {
        if (user[0]) {
          setEmail(user[0].email);
          if (user[0].tipo !== "Pendiente") {
            setUser({ username: user[0].username, tipo: user[0].tipo });
            if (user[0].tipo === "Empleado") {
              fetch(`/getServicios/${user[0].username}`)
                .then((res) => res.json())
                .then((quest) => setSolicitudes(quest));
            } else {
              fetch(`/getServiciosC/${user[0].username}`)
                .then((res) => res.json())
                .then((quest) => setSolicitudes(quest));
            }
          } else setUser(null);
        } else setEmail(null);
      });

    fetch("/getAllE")
      .then((res) => res.json())
      .then((quest) => setServicios(quest));
  }, []);

  function Regi() {
    return (
      <div>
        <Register email={email}></Register>
      </div>
    );
  }

  function Home() {
    return (
      <div className="">
        <h2>Bienvenidos a Service-App</h2>
        <div className="row">
          <div className="col-12 col-lg-4 Home">
            <div className="Home-box">
              <div className="col-12 Icon">
                <i className="fa fa-question-circle"></i>
              </div>
              <div className="col-12">
                <p>
                  Service-App es una herramienta que te permite conectarte con
                  otras personas que ofrecen sus servicios en diferentes áreas.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 Home">
            <div className="Home-box">
              <div className="col-12 Icon">
                <i className="fa fa-search"></i>
              </div>
              <div className="col-12">
                <p>
                  Puedes iniciar sesión y solicitar servicios a personas que han
                  ofrecido sus capacidades para hacerlos.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 Home">
            <div className="Home-box">
              <div className="col-12 Icon">
                <i className="fa fa-users"></i>
              </div>
              <div className="col-12">
                <p>
                  Puedes soliciar un servicio, aceptarlo, finalizarlo y
                  calificarlo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const Servicios = () => {
    return (
      <div>
        <Servicio servicios={servicios} usuario={user}></Servicio>
      </div>
    );
  };

  const Solicitud = () => {
    return (
      <div>
        <Solicitudes solicitud={solicitud} usuario={user}></Solicitudes>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <div className="container info">
        <div className="row">
          <div className="col-12">
            <Router>
              <nav
                id="navbar"
                className="navbar navbar-expand-lg navbar-dark bg-dark"
              >
                <a className="navbar-brand" href="/">
                  Service-App
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarTogglerDemo02"
                  aria-controls="navbarTogglerDemo02"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarTogglerDemo02"
                >
                  <div className="row menu-navbar">
                    <div className="col-12">
                      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                          <Link className="nav-link" to="/">
                            Home
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link className="nav-link" to="/servicios">
                            Servicios
                          </Link>
                        </li>
                        {!user ? (
                          <span></span>
                        ) : user.tipo === "Empleado" ? (
                          <Link className="nav-link" to="/solicitudes">
                            Solicitudes
                          </Link>
                        ) : (
                          <Link className="nav-link" to="/solicitudes">
                            Solicitudes
                          </Link>
                        )}

                        <li className="nav-item menu-login">
                          {!email ? (
                            <div>
                              <a
                                className="nav-link"
                                href={
                                  "https://service-app-uniandes.herokuapp.com/auth/google"
                                }
                              >
                                LOGIN WITH GOOGLE
                              </a>
                            </div>
                          ) : !user ? (
                            <div className="row">
                              <div className="col-6">
                                <Link className="nav-link" to="/register">
                                  {" "}
                                  Registrarse{" "}
                                </Link>
                              </div>
                            </div>
                          ) : (
                            <div className="row">
                              <div className="col-4">
                                <Link className="nav-link" to="/">
                                  {user.username}
                                </Link>
                              </div>
                              <div className="col-4">
                                <Link className="nav-link" to="/">
                                  {user.tipo}
                                </Link>
                              </div>
                              <div className="col-4">
                                <a
                                  className="nav-link"
                                  href={
                                    "https://service-app-uniandes.herokuapp.com/auth/google/logout"
                                  }
                                >
                                  Logout
                                </a>
                              </div>
                            </div>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </nav>

              <div className="contenido">
                <Switch>
                  <Route path="/register">
                    <Regi />
                  </Route>
                  <Route path="/servicios">
                    <Servicios />
                  </Route>
                  <Route path="/solicitudes">
                    <Solicitud />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </div>
            </Router>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default App;
