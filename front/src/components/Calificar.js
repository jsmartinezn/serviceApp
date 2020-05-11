import React from "react";

const Calificar = (props) => {
  return (
    <form action="/calificarServicio" method="post">
      <div className="form-group">
        <label>ID:</label>
        <input type="text" readonly="true" className="form-control" name="id" defaultValue={props.id} />
      </div>

      <div className="form-group">
        <label>Calificacion:</label>
        <input type="text" className="form-control" name="calificacion" />
      </div>
      <div>
        <button type="submit" className="btn btn-gold btn-card">
          Calificar
        </button>
      </div>
    </form>
  );
};

export default Calificar;
