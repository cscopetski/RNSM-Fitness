import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
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
import { Link } from "react-router-dom";
import SuccessFailureMessage from "../Success-FailureMessage";
import { changePassword } from "../../lib/User";
import ForgotPasswordButton from "./ForgotPasswordButton";

const PasswordReset = () => {
  const [showCurPassword, setShowCurPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputErrors, setInputErrors] = useState({});
  const [inputSuccess, setInputSuccess] = useState(false);

  const handleClickShowPassword = (type) => {
    if (type === "current") {
      setShowCurPassword(!showCurPassword);
    } else if (type === "new") {
      setShowPassword(!showPassword);
    }
  };

  const ValidatePasswords = (OldPassword, NewPassword, ConfirmPassword, cb) => {
    if (NewPassword !== ConfirmPassword) {
      cb("confirmpassword", "Passwords do not match");
    }
    if (OldPassword === NewPassword) {
      cb("password", "New password cannot be the same as current password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    let errorOccured = false;
    let errors = {};

    ValidatePasswords(
      data.get("curpassword"),
      data.get("password"),
      data.get("confirmpassword"),
      (error, resp) => {
        errors[error] = resp;
        errorOccured = true;
      }
    );

    if (errorOccured) {
      setInputErrors(errors);
      return;
    } else {
      setInputErrors({});
    }

    let body = {
      currentPassword: data.get("curpassword"),
      newPassword: data.get("password"),
    };

    changePassword(body)
      .then(() => {
        setInputErrors({});
        setInputSuccess(true);
      })
      .catch((err) => {
        errors["curpassword"] = "Wrong Password";
        setInputErrors(errors);
        setInputSuccess(false);
        console.log(inputErrors);
        console.log(err);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          required
          margin="normal"
          error={inputErrors["curpassword"] !== undefined ? true : false}
          helperText={
            inputErrors["curpassword"] !== undefined
              ? inputErrors["curpassword"]
              : undefined
          }
          name="curpassword"
          type={showCurPassword ? "text" : "password"}
          id="curpassword"
          label="Current Password"
          variant="filled"
          sx={{ width: "75%" }}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={(e) => handleClickShowPassword("current")}>
                  {showCurPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
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
          label="New Password"
          variant="filled"
          sx={{ width: "75%" }}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={(e) => handleClickShowPassword("new")}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          required
          error={inputErrors["confirmpassword"] !== undefined ? true : false}
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
        <SuccessFailureMessage
          success={inputSuccess}
          successMessage="Successfully changed password"
          setSuccess={setInputSuccess}
        ></SuccessFailureMessage>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            type="submit"
            sx={{ width: "100%", marginTop: "10%" }}
          >
            Save Changes
          </Button>
          <Box sx={{ width: "100%", marginTop: "5%" }}>
            <ForgotPasswordButton></ForgotPasswordButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default PasswordReset;
