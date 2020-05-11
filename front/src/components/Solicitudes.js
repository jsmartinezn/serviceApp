import React, { useState } from "react";
import AceptarServicio from "./AceptarServicio.js";
import Finalizar from "./Finalizar.js";
import Calificar from "./Calificar.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
      <div className="solicitudes row">
        <div className="col-12 informacion">
          <h2>Solicitudes:</h2>
          <p>A continuación encontrarás la lista de solicictudes que tienes actualmente. Puedes aceptar una solicitud de servicio nueva, finalizar una solicitud
          que se encuentre en proceso, y calificar aquellas que ya se encuentrar finalizadas. </p>
        </div>
        <Router>
          {props.solicitud.map((s, i) => (
            <div className="solicitud col-4" key={"question " + i}>
              <div className="fit">
                <h4>Estado: {s.estado}</h4>
                <h5>Empleado: {s.empleado}</h5>
                <h5>Cliente: {s.cliente}</h5>
                {props.usuario.tipo === "Empleado" &&
                s.estado === "solicitado" ? (
                  <button
                    type="submit"
                    className="btn btn-primary btn-card"
                    onClick={(e) => Aceptar(s._id)}
                  >
                    Aceptar Servicio
                  </button>
                ) : (
                  <span></span>
                )}

                {s.estado === "finalizada" ? (
                  <button
                    type="submit"
                    className="btn btn-gold btn-card"
                    onClick={(e) => Ca(s._id)}
                  >
                    Calificar
                  </button>
                ) : s.estado === "aceptada" ? (
                  <button
                    type="submit"
                    className="btn btn-danger btn-card"
                    onClick={(e) => Finalizarr(s._id)}
                  >
                    Finalizar
                  </button>
                ) : (
                  <span></span>
                )}
              </div>
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
              <div className="solicitar_servicio col-12">
                <div className="fit fit-2">
                  <Calificar id={id}></Calificar>
                </div>
              </div>
            )
          ) : (
            <div className="solicitar_servicio col-12">
              <div className="fit fit-2">
                <Finalizar id={id}></Finalizar>
              </div>
            </div>
          )
        ) : (
          <div className="solicitar_servicio col-12">
            <div className="fit fit-2">
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
