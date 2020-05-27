import React from "react";

const SolicitarServicio = (props) => {
  return (
    <form action="/registroServicio" method="post">
      <div className="form-group">
        <label>Usuario del empleado:</label>
        <input
          readOnly={true}
          className="form-control"
          type="text"
          name="usernameE"
          defaultValue={props.user}
        />
      </div>
      <div className="form-group">
        <label>Usuario del cliente:</label>
        <input
          className="form-control"
          type="text"
          name="usernameC"
          defaultValue={props.usuarioC.username}
        />
      </div>
      <div className="form-group">
        <label>Especificaciones:</label>
        <input type="text" className="form-control" name="especificacion" />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary btn-card">
          Solicitar
        </button>
      </div>
    </form>
  );
};

export default SolicitarServicio;
