import React, { useState, useEffect } from "react";
import Footer from "./footer.js";
import Register from "./components/Register.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Servicio from "./components/Servicios.js";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import Solicitudes from "./components/Solicitudes.js";

const CLIENT_ID =
  "928735218431-42u8v29ikt7o8sd4ljdr3n429fd43jfe.apps.googleusercontent.com";

const App = () => {
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState("");
  const [servicios, setServicios] = useState([]);
  const [solicitud, setSolicitudes] = useState([]);

  useEffect(() => {
    console.log("get user");
    fetch("/getUser")
      .then((res) => res.json())
      .then((user) => setEmail(user[0].email));
    fetch("/profile")
      .then((res) => res.json())
      .then((user) => {
        console.log("ayuda", user[0]);
        if (user[0]) {
          setUser({ username: user[0].username, tipo: user[0].tipo });
          if (user[0].tipo === "Empleado") {
            fetch(`/getServicios/${user[0].username}`)
              .then((res) => res.json())
              .then((quest) => setSolicitudes(quest));
            console.log("no deberia entrar");
          } else {
            fetch(`/getServiciosC/${user[0].username}`)
              .then((res) => res.json())
              .then((quest) => {
                console.log("quest!", quest);
                setSolicitudes(quest);
              });
            console.log("deberia entrar");
          }
        } else setUser(null);
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
  const GoogleBtn = () => {
    const login = (response) => {
      console.log("que pasa", JSON.stringify(response.Qt.zu));
      setEmail(JSON.stringify(response.Qt.zu));
      fetch("/login/" + response.Qt.zu);
    };

    const logout = (response) => {
      fetch("/logout");
      setEmail("");
      console.log("logout");
    };
    console.log("usuario", email);
    return (
      <div>
        {email ? (
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={logout}
          ></GoogleLogout>
        ) : (
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login"
            onSuccess={login}
            cookiePolicy={"single_host_origin"}
            responseType="code,token"
          />
        )}
      </div>
    );
  };

  const Servicios = () => {
    console.log("ser", servicios);
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
                  PreguntAndes
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
                        <li className="nav-item">
                          <Link className="nav-link" to="/filtrar">
                            Filtrar
                          </Link>
                        </li>
                        <li className="nav-item menu-login">
                          {!email ? (
                            <div className="row">
                              <GoogleBtn />
                            </div>
                          ) : !user ? (
                            <div className="row">
                              <div className="col-6">
                                <Link className="nav-link" to="/register">
                                  {" "}
                                  Registrarse{" "}
                                </Link>
                              </div>
                              <div className="col-6">
                                <GoogleBtn />
                              </div>
                            </div>
                          ) : (
                            <div className="row">
                              <div className="col-3">
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
                                <div className="row">
                                  <GoogleBtn />
                                </div>
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
                  <Route path="/login">
                    <GoogleBtn />
                  </Route>
                  <Route path="/register">
                    <Regi />
                  </Route>
                  <Route path="/servicios">
                    <Servicios />
                  </Route>
                  <Route path="/solicitudes">
                    <Solicitud />
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
