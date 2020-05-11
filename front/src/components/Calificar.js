import React from "react";

const Calificar = (props) => {
  return (
    <form action="/calificarServicio" method="post">
      <div>
        <label>ID:</label>
        <input type="text" name="id" defaultValue={props.id} />
      </div>

      <div>
        <label>Calificacion:</label>
        <input type="text" name="calificacion" />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Calificar
        </button>
      </div>
    </form>
  );
};

export default Calificar;
