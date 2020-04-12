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
      .then((resp) => {
        return setQuestions(resp);
      });
  };

  return (
    <div>
      <div className="container">
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                {!user ? (
                  <div>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                  </div>
                ) : (
                  <div>
                    welcome {user.username}{" "}
                    <button onClick={onLogout}>Logout</button>{" "}
                  </div>
                )}
              </ul>
            </nav>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/login">
                <Logi />
              </Route>
              <Route path="/register">
                <Regi />
              </Route>
            </Switch>
          </div>
        </Router>

        <div>
          {user ? (
            <div>
              <button onClick={misPreguntas}>Mis preguntas</button>{" "}
            </div>
          ) : (
            <span></span>
          )}

          <div>
            <button onClick={todasPreguntas}>Todas las preguntas</button>{" "}
          </div>
          <div>
            <Filter enviar={filter}></Filter>
          </div>
        </div>

        <div className="row">
          <div className="col-8">
            <Questions questions={questions} usuario={user}></Questions>
          </div>
          {user ? (
            <div className="col-4">
              <h2>Crear una nueva pregunta</h2>
              <FormCreateQuestions
                username={user.username}
              ></FormCreateQuestions>
            </div>
          ) : (
            <span></span>
          )}
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
