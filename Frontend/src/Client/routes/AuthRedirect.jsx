import { Navigate } from "react-router-dom";
import { AxiosInstance } from "../modules/req.js";
import React, { useEffect } from "react";
import Loading from "../Components/Loading";

const AuthRedirect = ({ token, setToken }) => {
    useEffect(() => {
        if (token === undefined) {
            AxiosInstance.get("auth/login/success")
                .then((resp) => {
                    let user = resp.data;
                    setToken(user.id);
                })
                .catch((err) => {
                    console.error(err);
                });
        };
    });

    return (
        <>
            {(token != undefined) && (
                <Navigate to="/" replace={true} />
            )}
            <Loading minHeight={"1000px"} />
        </>
    );
};

export default AuthRedirect;
