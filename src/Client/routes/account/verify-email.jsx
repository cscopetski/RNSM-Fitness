import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SuccessFailureMessage from "../../Components/Success-FailureMessage";
import { PageLoadingMinHeight } from "../../lib/Loading";

const VerifyEmail = () => {
  let { verificationToken } = useParams();

  const [inputErrors, setInputErrors] = useState(false);
  const [inputSuccess, setInputSuccess] = useState(false);

  const sendVerifyEmailRequest = async (token) => {
    let body = { token: token };
    const resp = await fetch("http://localhost:5000/api/users/verify-email", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://localhost:5000",
      },
      body: JSON.stringify(body),
    });

    if (resp.status !== 200) {
      throw new Error(resp.status);
    } else {
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInputErrors(false);
    setInputSuccess(false);

    if (verificationToken !== "") {
      sendVerifyEmailRequest(verificationToken)
        .then(() => {
          setInputErrors(false);
          setInputSuccess(true);
        })
        .catch((err) => {
          setInputErrors(true);
          setInputSuccess(false);
          console.log(err);
        });
    } else {
      setInputErrors(true);
      setInputSuccess(false);
    }
  };

  return (
    <div>
      <main>
        <div>
          <Container
            maxWidth="sm"
            sx={{
              minHeight: PageLoadingMinHeight,
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                padding: 2,
                borderRadius: 2,
                marginTop: 10,
                marginBottom: 10,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "background.darkPaper",
                boxShadow: 4,
              }}
            >
              <Typography variant="h4" align="center" sx={{ padding: 1 }}>
                Verify Email:
              </Typography>
              <Button
                size="large"
                type="submit"
                variant="contained"
                sx={{ width: "50%", marginTop: "5%", marginBottom: "5%" }}
              >
                Verify Email
              </Button>
              <Box sx={{ width: "75%" }}>
                <SuccessFailureMessage
                  successMessage={"Successfully verified email address"}
                  success={inputSuccess}
                  failureMessage="Error verifying email address"
                  failure={inputErrors}
                  setFailure={setInputErrors}
                  setSuccess={setInputSuccess}
                ></SuccessFailureMessage>
              </Box>
            </Box>
          </Container>
        </div>
      </main>
    </div>
  );
};

export default VerifyEmail;
