import React, { useState } from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import LoginCredentials from "../models/loginCredentials";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ForgotPasswordButton from "./SettingsPage/ForgotPasswordButton";

function LoginBox({ sendLoginRequest, loginError, loginWithGoogle }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const email = data.get("email");
    const password = data.get("password");

    const creds = new LoginCredentials(email, password);
    sendLoginRequest(creds);
  };

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: "10%",
          backgroundColor: "background.darkPaper",
          display: "flex",
          borderRadius: 2,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" sx={{ marginTop: "25px" }}>
          Sign In
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            margin: "0 auto",
            textAlign: "center",
            // display: "flex",
            // // borderRadius: 2,
            // flexDirection: "column",
            // alignItems: "center",
            mt: 1,
            // ".MuiInputLabel-root.Mui-focused": {
            //   color: "rgba(0, 0, 0, 0.6)",
            // },
            ".MuiTextField-root": {
              width: "60%",
            },
          }}
        >
          <TextField
            required
            margin="normal"
            name="email"
            id="email"
            type="email"
            label="Email"
            variant="filled"
            InputProps={{ disableUnderline: true }}
          />
          <TextField
            required
            margin="normal"
            name="password"
            id="password"
            label="Password"
            variant="filled"
            error={loginError}
            helperText={loginError ? "Invalid username or password" : ""}
            type={showPassword ? "text" : "password"}
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
          <Button
            disableRipple
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 0, width: "60%" }}
          >
            Sign In
          </Button>

          <Button
            disableRipple
            type="button"
            onClick={loginWithGoogle}
            variant="contained"
            sx={{ mt: 3, mb: 0, width: "60%" }}
          >
            Login With Google
          </Button>
        </Box>
        <Box
          sx={{
            marginTop: "10%",
            marginBottom: "5%",
            backgroundColor: "background.darkPaper",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "80%",
          }}
        >
          <Box
            sx={{
              width: "45%",
              marginRight: "10%",
              alignText: "center",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              bgcolor: "primary.light",
            }}
          >
            <ForgotPasswordButton></ForgotPasswordButton>
          </Box>
          <Button
            component={Link}
            to="/account/create"
            variant="contained"
            sx={{
              width: "45%",
              alignText: "center",
              bgcolor: "primary.light",
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginBox;
