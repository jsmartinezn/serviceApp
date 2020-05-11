import React from "react";

import { GoogleLogin, GoogleLogout } from "react-google-login";

const CLIENT_ID =
  "928735218431-42u8v29ikt7o8sd4ljdr3n429fd43jfe.apps.googleusercontent.com";

const GoogleBtn = (props) => {
  const a = true;
  const login = (response) => {
    console.log(props);
    console.log("que pasa", response.Qt.zu);
    props.setUsuario(response.Qt.zu);
  };

  const logout = (response) => {
    console.log("logout");
  };

  return (
    <div>
      {a ? (
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={logout}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login"
          onSuccess={login}
          cookiePolicy={"single_host_origin"}
          responseType="code,token"
        />
      )}
    </div>
  );
};

export default GoogleBtn;
