import React, { useState } from "react";
import SolicitarServicio from "./SolicitarServicio.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Servicios = (props) => {
  const [servicio, setServicio] = useState([""]);

  function Solicitar(user) {
    console.log("usuario", user);
    setServicio(user);
    return (
      <div>
        <SolicitarServicio
          user={user}
          usuarioC={props.usuario}
        ></SolicitarServicio>
      </div>
    );
  }

  const renderServicios = () => {
    return (
      <div>
        <Router>
          {props.servicios.map((s, i) => (
            <div key={"question " + i}>
              <h2>
                {s.username}: {s.ocupacion}
              </h2>
              {!props.usuario ? (
                <span></span>
              ) : (
                <button to="/solicitar" onClick={(e) => Solicitar(s.username)}>
                  Solicitar
                </button>
              )}
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
        {!servicio ? (
          <span></span>
        ) : (
          <div>
            <SolicitarServicio
              user={servicio}
              usuarioC={props.usuario}
            ></SolicitarServicio>
          </div>
        )}
      </div>
    );
  };
  return <div className="Questions">{renderServicios()}</div>;
};

export default Servicios;
