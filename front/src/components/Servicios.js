import React, { useState } from "react";
import SolicitarServicio from "./SolicitarServicio.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Servicios = (props) => {
  const [servicio, setServicio] = useState([]);
  const [seleccion, setSeleccion] = useState(false);

  function Solicitar(user) {
    setSeleccion(true);
    setServicio(user);
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
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => Solicitar(s.username)}
                >
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
        {!seleccion ? (
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
