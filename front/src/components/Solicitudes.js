import React from "react";
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
  console.log("tipo", props.usuario.tipo === "Empleado");
  function Aceptar() {
    let { id } = useParams();

    return (
      <div>
        <AceptarServicio id={id}></AceptarServicio>
      </div>
    );
  }

  function Finalizarr() {
    let { id } = useParams();

    return (
      <div>
        <Finalizar id={id}></Finalizar>
      </div>
    );
  }

  function Ca() {
    let { id } = useParams();

    return (
      <div>
        <Calificar id={id}></Calificar>
      </div>
    );
  }

  const renderSolicitudes = () => {
    return (
      <Router>
        {props.solicitud.map((s, i) => (
          <div key={"question " + i}>
            <h4>Empleado: {s.empleado}</h4>
            <h4>Cliente: {s.cliente}</h4>
            <h4>Estado: {s.estado}</h4>
            {props.usuario.tipo === "Empleado" ? (
              <Link className="nav-link" to={`solicitar/${s._id}`}>
                Aceptar
              </Link>
            ) : (
              <span></span>
            )}

            {s.estado === "finalizada" ? (
              <Link className="nav-link" to={`calificar/${s._id}`}>
                Calificar
              </Link>
            ) : (
              <Link className="nav-link" to={`finalizar/${s._id}`}>
                Finalizar
              </Link>
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
    );
  };
  return <div className="Solicitudes">{renderSolicitudes()}</div>;
};

export default Solicitudes;
