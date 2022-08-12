import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import { AxiosInstance } from "../../modules/req.js";

const Logout = ({ setToken }) => {
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    if (!loggedOut) {
      setTimeout(() => {
        AxiosInstance.post("auth/logout")
          .then(() => {
            setToken(undefined);
            setLoggedOut(true);
          })
          .catch((error) => {
            console.error(error);
          });
      }, 1000);
    }
  }, []);

  if (!loggedOut) {
    return <Loading minHeight={"1000px"} />;
  }

  return <>{loggedOut ? <Navigate to="/" /> : undefined}</>;
};

export default Logout;
