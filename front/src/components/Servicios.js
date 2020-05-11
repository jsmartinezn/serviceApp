import React from "react";
import SolicitarServicio from "./SolicitarServicio.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

const Servicios = (props) => {
  function Solicitar() {
    let { user } = useParams();

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
      <Router>
        {props.servicios.map((s, i) => (
          <div key={"question " + i}>
            <h2>
              {s.username}: {s.ocupacion}
            </h2>
            {!props.usuario ? (
              <span></span>
            ) : (
              <Link className="nav-link" to={`solicitar/${s.username}`}>
                SolicitarServicio
              </Link>
            )}
          </div>
        ))}

        <div className="contenido">
          <Switch>
            <Route path="/solicitar/:user">
              <Solicitar />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  };
  return <div className="Questions">{renderServicios()}</div>;
};

export default Servicios;
