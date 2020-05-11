import React, { useState } from "react";
import AceptarServicio from "./AceptarServicio.js";
import Finalizar from "./Finalizar.js";
import Calificar from "./Calificar.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

const Solicitudes = (props) => {
  const [id, setId] = useState([]);
  const [aceptar, setAceptar] = useState(false);
  const [fin, setFin] = useState(false);
  const [cal, setCal] = useState(false);

  function Aceptar(id) {
    setAceptar(true);
    setFin(false);
    setCal(false);
    setId(id);
  }

  function Finalizarr(id) {
    setAceptar(false);
    setFin(true);
    setCal(false);
    setId(id);
  }

  function Ca(id) {
    setAceptar(false);
    setFin(false);
    setCal(true);
    setId(id);
  }

  const renderSolicitudes = () => {
    return (
      <div>
        <Router>
          {props.solicitud.map((s, i) => (
            <div key={"question " + i}>
              <h4>Empleado: {s.empleado}</h4>
              <h4>Cliente: {s.cliente}</h4>
              <h4>Estado: {s.estado}</h4>
              {props.usuario.tipo === "Empleado" &&
              s.estado === "solicitado" ? (
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => Aceptar(s._id)}
                >
                  Aceptar servicio
                </button>
              ) : (
                <span></span>
              )}

              {s.estado === "finalizada" ? (
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => Ca(s._id)}
                >
                  Calificar
                </button>
              ) : s.estado === "aceptada" ? (
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => Finalizarr(s._id)}
                >
                  finalizar
                </button>
              ) : (
                <span></span>
              )}
            </div>
          ))}

          <div className="contenido">
            <Switch>
              <Route path="/solicitar/:id">
                <Aceptar />
              </Route>
              <Route path="/finalizar/:id">
                <Finalizarr />
              </Route>
              <Route path="/calificar/:id">
                <Ca />
              </Route>
            </Switch>
          </div>
        </Router>
        {!aceptar ? (
          !fin ? (
            !cal ? (
              <span></span>
            ) : (
              <div>
                <Calificar id={id}></Calificar>
              </div>
            )
          ) : (
            <div>
              <Finalizar id={id}></Finalizar>
            </div>
          )
        ) : (
          <div>
            <div>
              <AceptarServicio id={id}></AceptarServicio>
            </div>
          </div>
        )}
      </div>
    );
  };
  return <div className="Solicitudes">{renderSolicitudes()}</div>;
};

export default Solicitudes;
