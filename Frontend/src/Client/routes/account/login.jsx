import LoginBox from "../../Components/LoginBox";
import React, { useState } from "react";
import { AxiosInstance } from "../../modules/req.js";
import Container from "@mui/material/Container";
import { PageLoadingMinHeight } from "../../lib/Loading";

function Login({ setToken }) {
  const [loginError, setLoginError] = useState(false);

  const sendLoginRequest = (loginCredentials) => {
    AxiosInstance.post("auth/login", loginCredentials)
      .then((data) => {
        window.location = window.location.origin + '/auth/redirect';
        setLoginError(false);
      })
      .catch((error) => {
        console.error(error);
        setLoginError(true);
      });
  };

  /*
    TODO: Turn this into env variables so we dont need an if statement
  */
  const loginWithGoogle = () => {
    if (process.env.NODE_ENV == "development") {
      window.open("http://localhost:5000/auth/google", "_self");
    } else if (process.env.NODE_ENV == "production") {
      window.open("https://rnsm.fit:5000/auth/google", "_self");
    }

  };

  return (
    <div>
      <Container
        sx={{
          minHeight: PageLoadingMinHeight,
        }}
      >
        <LoginBox
          loginError={loginError}
          setToken={setToken}
          sendLoginRequest={sendLoginRequest}
          loginWithGoogle={loginWithGoogle}
        />
      </Container>
    </div>
  );
}

export default Login;
