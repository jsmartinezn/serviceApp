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
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default Login;
