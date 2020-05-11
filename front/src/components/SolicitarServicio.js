import React from "react";

const SolicitarServicio = (props) => {
  console.log("suarioC", props.usuarioC);
  return (
    <form action="/registroServicio" method="post">
      <div>
        <label>Usuario del empleado:</label>
        <input type="text" name="usernameE" defaultValue={props.user} />
      </div>
      <div>
        <label>Usuario del cliente:</label>
        <input
          type="text"
          name="usernameC"
          defaultValue={props.usuarioC.username}
        />
      </div>
      <div>
        <label>Especificaciones:</label>
        <input type="text" name="especificacion" />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Solicitar
        </button>
      </div>
    </form>
  );
};

export default SolicitarServicio;
