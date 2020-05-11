import React from "react";

const Empleado = (props) => {
  return (
    <form action="/registerEmpleado" method="post">
      <div>
        <label>Username:</label>
        <input type="text" name="username" required />
        <br />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" name="email" defaultValue={props.email} disabled />
        <br />
      </div>
      <div>
        <label>Ocupación:</label>
        <input type="text" name="ocupacion" required />
      </div>
      <div>
        <label>Años de experiencia:</label>
        <input type="text" name="experiencia" required />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Registrarse
        </button>
      </div>
    </form>
  );
};

export default Empleado;
