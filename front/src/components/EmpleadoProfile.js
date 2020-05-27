import React, { useState, useEffect } from "react";

const EmpleadoP = (props) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(`getEmpleado/${props.user}`)
      .then((res) => res.json())
      .then((quest) => setUser(quest[0]));
  }, [props.user]);

  console.log("user detail", user);
  return (
    <div>
      <div>Foto</div>
      <div>Username: {props.user}</div>
      <div>Ocupacion: {user.ocupacion}</div>
      <div>Años de experiencia: {user.anios}</div>
      <div>Telefono: {user.telefono}</div>
      <div>Descripción del trabajo que hace</div>
      <div>Recluta nuevos jugadores</div>

      <button>Chatear</button>
    </div>
  );
};

export default EmpleadoP;
