import React from "react";

const Empleado = (props) => {
  return (
    <form action="/registerEmpleado" method="post">
      <div>
      //Por usabilidad coloquen los atributos for y name a estas etiquetas
        <label for="username">Username:</label>
        <input type="text" name="username" required />
        <br />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="text" name="email" defaultValue={props.email} disabled />
        <br />
      </div>
      <div>
        <label for="ocupacion">Ocupación:</label>
        <input type="text" name="ocupacion" required />
      </div>
      <div>
        <label for="experiencia">Años de experiencia:</label>
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
