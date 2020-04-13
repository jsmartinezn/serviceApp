import React, { useState, useEffect } from "react";
import Footer from "./footer.js";
import Questions from "./components/Questions.js";
import FormCreateQuestions from "./components/FormCreateQuestions.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Filter from "./components/Filter.js";

const App = () => {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    console.log("get user");
    fetch("/getUser")
      .then((res) => res.json())
      .then((user) => setUser(user));
  }, []);

  const todasPreguntas = () =>
    fetch("/preguntas")
      .then((res) => res.json())
      .then((quest) => setQuestions(quest));

  const misPreguntas = () =>
    fetch("/getPreguntasUsuario")
      .then((res) => res.json())
      .then((resp) => setQuestions(resp));

  const onLogout = () => {
    fetch("/logout")
      .then((res) => res.json())
      .then((res) => {
        setQuestions([]);
        if (res.ok) {
          setUser(null);
        } else {
          alert("errroooooorrr");
        }
      });
  };

  const filter = (materia) => {
    fetch(`/getMateria/${materia}`)
      .then((res) => res.json())
      .then((resp) => setQuestions(resp));
  };

  const CrearPregunta = () => {
    return (
      <div>
        <h2>Preguntar: </h2>
        <FormCreateQuestions user={user} />
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
                        <li className="nav-item" onClick={todasPreguntas}>
                          <Link className="nav-link" to="/">
                            Preguntas
                          </Link>
                        </li>

                        {!user ? (
                          <span></span>
                        ) : (
                          <li className="nav-item" onClick={misPreguntas}>
                            <Link className="nav-link" to="/">
                              Mis preguntas
                            </Link>
                          </li>
                        )}
                        {!user ? (
                          <span></span>
                        ) : (
                          <li className="nav-item">
                            <Link className="nav-link" to="/crearPregunta">
                              Preguntar
                            </Link>
                          </li>
                        )}
                        <li className="nav-item">
                          <Link className="nav-link" to="/filtrar">
                            Filtrar
                          </Link>
                        </li>
                        <li className="nav-item menu-login">
                          {!user ? (
                            <div className="row">
                              <div className="col-7">
                                <Link className="nav-link" to="/login">
                                  {" "}
                                  Iniciar Sesión
                                </Link>
                              </div>
                              <div className="col-5">
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
                                  {" "}
                                  {user.username}{" "}
                                </Link>
                              </div>
                              <div className="col-8">
                                <Link
                                  className="nav-link"
                                  to="/"
                                  onClick={onLogout}
                                >
                                  Cerrar sesion
                                </Link>
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
                    <Logi />
                  </Route>
                  <Route path="/register">
                    <Regi />
                  </Route>
                  <Route path="/crearPregunta">
                    <CrearPregunta />
                  </Route>
                  <Route path="/filtrar">
                    <Filter enviar={filter} />
                  </Route>
                </Switch>
              </div>
            </Router>
          </div>
        </div>

        <div className="row">
          <div className="col-8">
            <Questions questions={questions} usuario={user}></Questions>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default App;

function Logi() {
  return (
    <div>
      <Login></Login>
    </div>
  );
}

function Regi() {
  return (
    <div>
      <Register></Register>
    </div>
  );
}
