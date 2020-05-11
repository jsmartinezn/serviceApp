import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Empleados from "./RegEmpleado.js";
import Clientes from "./RegCliente.js";

const Register = (props) => {
  function Empleado() {
    return (
      <h2>
        <Empleados email={props.email}></Empleados>
      </h2>
    );
  }

  function Cliente() {
    return (
      <h2>
        <Clientes email={props.email}></Clientes>
      </h2>
    );
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/empleado">Empleado</Link>
            </li>
            <li>
              <Link to="/cliente">Cliente</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/empleado">
            <Empleado />
          </Route>
          <Route path="/cliente">
            <Cliente />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Register;
