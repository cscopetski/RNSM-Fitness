import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import { AxiosInstance } from "../../modules/req.js";

export async function logoutUser(url = "") {
  const resp = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://localhost:5000",
    },
  });

  if (resp.status !== 200) {
    throw new Error("Failed to logout");
  }
}

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
