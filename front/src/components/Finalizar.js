import React from "react";

const Finalizar = (props) => {
  return (
    <form action="/finalizarServicio" method="post">
      <div>
        <label>ID:</label>
        <input type="text" name="id" defaultValue={props.id} />
      </div>

      <div>
        <label>Comentario:</label>
        <input type="text" name="comentarios" />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Aceptar
        </button>
      </div>
    </form>
  );
};

export default Finalizar;
