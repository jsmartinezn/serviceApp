import React, { useState } from "react";
import SolicitarServicio from "./SolicitarServicio.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Consideren colocar los tipos de los props, ayuda a evitar errores
import PropTypes from 'prop-types';


const Servicios = (props) => {
  const [servicio, setServicio] = useState([]);
  const [seleccion, setSeleccion] = useState(false);

  function Solicitar(user) {
    setSeleccion(true);
    setServicio(user);
  }

  const renderServicios = () => {
    return (
      <div className="servicios row">
        <div className="informacion col-12">
          <h2> Servicios: </h2>
          <p> A continuación se presenta una lista de servicios disponibles. Para solicitar un servicio basta con dar click en el botón solicitar y llenar la información adicional que se encuentra al final de la página. </p>
        </div>
        <Router>
          {props.servicios.map((s, i) => (
            <div className="servicio col-4"key={"question " + i}>
              <div className="fit">
                <div>
                  <h5>
                    Usuario: {s.username}
                  </h5>
                  <h6>
                    Ocupación: {s.ocupacion}
                  </h6>
                </div>
                {!props.usuario ? (
                  <span></span>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary btn-card"
                    onClick={(e) => Solicitar(s.username)}
                  >
                    Solicitar
                  </button>
                )}
              </div>
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
          <div className="solicitar_servicio col-12">
            <div className="fit fit-3">
              <SolicitarServicio
                user={servicio}
                usuarioC={props.usuario}
              ></SolicitarServicio>
            </div>
          </div>
        )}
      </div>
    );
  };
  return <div className="Questions">{renderServicios()}</div>;
};


Servicios.propTypes = {
  //Sus prototipos
};
export default Servicios;
