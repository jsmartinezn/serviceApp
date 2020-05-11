import React from "react";

const Cliente = (props) => {
  return (
    <form action="/registerCliente" method="post">
      <div>
        <label>Username:</label>
        <input type="text" name="username" required />
        <br />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" name="email" defaultValue={props.email} disabled />
        <br />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Registrarse
        </button>
      </div>
    </form>
  );
};

export default Cliente;
