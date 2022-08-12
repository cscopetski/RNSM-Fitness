import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Navigate, useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SuccessFailureMessage from "../../Components/Success-FailureMessage";
import { PageLoadingMinHeight } from "../../lib/Loading";

const ResetPassword = ({ token }) => {
  let { resetToken } = useParams();

  const [resetTokenError, setResetTokenError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputErrors, setInputErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [inputSuccess, setInputSuccess] = useState(undefined);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const ValidatePasswords = (Password, ConfirmPassword, cb) => {
    if (Password !== ConfirmPassword) {
      cb("confirmpassword", "Wrong Password");
    }
  };

  const sendForgotPasswordRequest = async (password) => {
    password.resetToken = resetToken;

    const resp = await fetch("http://localhost:5000/api/users/reset-password", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://localhost:5000",
      },
      body: JSON.stringify(password),
    });

    if (resp.status !== 200) {
      throw new Error(resp.status);
    } else {
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResetTokenError(false);
    setInputSuccess(undefined);

    const data = new FormData(e.currentTarget);
    let errorOccured = false;
    let errors = new Object();

    ValidatePasswords(
      data.get("password"),
      data.get("confirmpassword"),
      (error, resp) => {
        errors[error] = resp;
        errorOccured = true;
      }
    );

    if (errorOccured) {
      setInputErrors(errors);
      setSuccess(false);
      return;
    } else {
      setInputErrors({});
    }
    if (resetToken !== "") {
      sendForgotPasswordRequest({ password: data.get("password") })
        .then(() => {
          setResetTokenError(false);
          setInputSuccess("Successfully reset password");
          setSuccess(true);
        })
        .catch((err) => {
          setResetTokenError(true);
          setSuccess(false);
          console.log(err);
        });
    } else {
      setResetTokenError(true);
      setSuccess(false);
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
                Enter New Password:
              </Typography>
              <TextField
                required
                margin="normal"
                error={inputErrors["password"] !== undefined ? true : false}
                helperText={
                  inputErrors["password"] !== undefined
                    ? inputErrors["password"]
                    : undefined
                }
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                label="Password"
                variant="filled"
                sx={{ width: "75%" }}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                required
                error={
                  inputErrors["confirmpassword"] !== undefined ? true : false
                }
                helperText={
                  inputErrors["confirmpassword"] !== undefined
                    ? inputErrors["confirmpassword"]
                    : undefined
                }
                margin="normal"
                name="confirmpassword"
                type="password"
                id="confirmpassword"
                label="Confirm Password"
                variant="filled"
                sx={{ width: "75%" }}
                InputProps={{
                  disableUnderline: true,
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ marginTop: "5%", width: "25%" }}
              >
                Submit
              </Button>
              <Box sx={{ width: "75%" }}>
                <SuccessFailureMessage
                  successMessage={inputSuccess}
                  success={success}
                  failureMessage="Invalid Reset Code"
                  failure={resetTokenError}
                  setFailure={setResetTokenError}
                  setSuccess={setSuccess}
                ></SuccessFailureMessage>
              </Box>
            </Box>
          </Container>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
