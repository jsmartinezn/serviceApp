import React from "react";

const AceptarServicio = (props) => {
  return (
    <form action="/aceptarServicio" method="post">
      <div className="form-group">
        <label>ID:</label>
        <input type="text" readonly="true" className="form-control" name="id" defaultValue={props.id} />
      </div>

      <div className="form-group">
        <label>Comentarios:</label>
        <input type="text" className="form-control" name="comentarios" />
      </div>
      <div>
        <button type="submit" className="btn btn-primary btn-card">
          Aceptar
        </button>
      </div>
    </form>
  );
};
//Manejar proptypes permitiria tener un mejor control sobre la informacion
export default AceptarServicio;
