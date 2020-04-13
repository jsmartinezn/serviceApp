import React from "react";

const Login = () => {
  return (
    <form action="/login" method="post">
      <div>
        <label>Username:</label>
        <input type="text" name="username" required />
        <br />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" required />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Iniciar sesión
        </button>
      </div>
    </form>
  );
};

export default Login;
