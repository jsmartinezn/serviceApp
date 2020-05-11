import React from "react";

const Finalizar = (props) => {
  return (
    <form action="/finalizarServicio" method="post">
      <div className="form-group">
        <label>ID:</label>
        <input type="text" readonly="true" className="form-control" name="id" defaultValue={props.id} />
      </div>

      <div className="form-group">
        <label>Comentario:</label>
        <input type="text" className="form-control" name="comentarios" />
      </div>
      <div>
        <button type="submit" className="btn btn-danger btn-card">
          Aceptar
        </button>
      </div>
    </form>
  );
};

export default Finalizar;
