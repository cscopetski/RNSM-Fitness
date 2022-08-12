import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Navigate, useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { post } from "../../modules/req";
import { PageLoadingMinHeight } from "../../lib/Loading";

const ForgotPassword = ({ token }) => {
  const [emailError, setEmailError] = useState(false);
  const [inputSuccess, setInputSuccess] = useState(undefined);

  const sendForgotPasswordRequest = async (email) => {
    const resp = await fetch("http://localhost:5000/api/users/forgot", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://localhost:5000",
      },
      body: JSON.stringify(email),
    });

    if (resp.status !== 200) {
      throw new Error(resp.status);
    } else {
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email !== "") {
      setEmailError(false);
      setInputSuccess(undefined);
      sendForgotPasswordRequest({ email: email })
        .then(() => {
          setEmailError(false);
          setInputSuccess(
            "Successfully sent forgot password email to " + email
          );
        })
        .catch((err) => {
          console.log(err);
          setEmailError(true);
        });
    }
  };

  return (
    <div>
      <main>
        <div>
          <Container maxWidth="sm" sx={{
            minHeight: PageLoadingMinHeight
          }}>
            <Typography variant="h2" align="center" gutterBottom>
              Forgot Password
            </Typography>

            <Typography variant="h2" align="center" gutterBottom>
              Forgot your password? You stupid or something?
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  border: 1,
                  marginTop: 10,
                  marginBottom: "5%",
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                }}
              >
                <Typography
                  variant="h4"
                  align="center"
                  sx={{ color: "black", padding: 1 }}
                >
                  Enter Email:
                </Typography>
                <TextField
                  type="email"
                  name="email"
                  id="email"
                  error={emailError}
                  sx={{ color: "black", padding: 1 }}
                  helperText={
                    emailError
                      ? "An account with that email does not exist"
                      : ""
                  }
                ></TextField>
                <Button type="submit">Submit</Button>
              </Box>
              <Box>
                {inputSuccess !== undefined ? (
                  <Typography
                    variant="h7"
                    align="center"
                    sx={{ padding: "5%", color: "green" }}
                  >
                    {inputSuccess}
                  </Typography>
                ) : undefined}
              </Box>
            </Box>
          </Container>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
