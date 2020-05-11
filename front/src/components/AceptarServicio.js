import React from "react";

const AceptarServicio = (props) => {
  console.log("this.props", props);
  return (
    <form action="/aceptarServicio" method="post">
      <div>
        <label>ID:</label>
        <input type="text" name="id" defaultValue={props.id} />
      </div>

      <div>
        <label>Comentarios:</label>
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

export default AceptarServicio;
