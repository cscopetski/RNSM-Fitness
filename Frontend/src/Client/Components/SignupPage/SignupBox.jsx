import React, { useState } from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SignupCredentials from "../../models/signupCredentials.js";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
} from "@mui/material";

const ValidatePasswords = (Password, ConfirmPassword, cb) => {
  if (Password !== ConfirmPassword) {
    cb("confirmpassword", "Wrong Password");
  }
};

function LoginBox({
  sendSignupRequest,
  signupError,
  setSignupCreds,
  singupWithGoogle,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputErrors, setInputErrors] = useState({});

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      return;
    }
    const creds = new SignupCredentials(
      data.get("firstname"),
      data.get("lastname"),
      data.get("email"),

      data.get("password")
    );
    setSignupCreds(creds);
    sendSignupRequest();
  };

  return (
    <Box
      sx={{
        marginTop: "5%",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignText: "center",
        marginBottom: "10%",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: "25px" }}>
        Sign Up
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignText: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            width: "80%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            alignText: "center",
          }}
        >
          <TextField
            required
            name="firstname"
            id="firstname"
            label="First name"
            variant="filled"
            sx={{ width: "47.5%", marginRight: "5%" }}
            InputProps={{ disableUnderline: true }}
          />
          <TextField
            required
            name="lastname"
            id="lastname"
            label="Last name"
            variant="filled"
            sx={{ width: "47.5%" }}
            InputProps={{ disableUnderline: true }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "5%",
            width: "80%",
            justifyContent: "center",
            alignItems: "center",
            alignText: "center",
          }}
        >
          <TextField
            required
            margin="normal"
            error={signupError}
            type="email"
            name="email"
            id="email"
            label="Email"
            variant="filled"
            sx={{ width: "100%" }}
            helperText={
              signupError
                ? "An account with that email address already exists"
                : ""
            }
            InputProps={{ disableUnderline: true }}
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
            label="Password"
            variant="filled"
            sx={{ width: "100%" }}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
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
            sx={{ width: "100%" }}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "5%",
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            alignText: "center",
          }}
        >
          <Button
            disableRipple
            type="submit"
            variant="contained"
            sx={{ width: "100%" }}
          >
            Sign Up
          </Button>

          <Button
            disableRipple
            type="button"
            onClick={singupWithGoogle}
            variant="contained"
            sx={{ mt: 3, width: "100%" }}
          >
            Sign Up With Google
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginBox;
