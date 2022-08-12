import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import UnitsButton from "../SignupPage/UnitsButton";
import DateInput from "../SignupPage/DateInput";
import SuccessFailureMessage from "../Success-FailureMessage";
import { sendForgotPasswordEmail, updateUser } from "../../lib/User";
import AddFoodDialog from "../DailyFoodLog/AddFoodDialog";

const ForgotPasswordBox = ({ handleClose = () => {} }) => {
  const [emailError, setEmailError] = useState(false);
  const [inputSuccess, setInputSuccess] = useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email !== "") {
      setEmailError(false);
      setInputSuccess(undefined);
      sendForgotPasswordEmail({ email: email })
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
          marginTop: "5%",
          marginBottom: "5%",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          alignText: "center",
        }}
      >
        <Typography variant="h7" align="center">
          Enter account email to send password reset request to:
        </Typography>
        <TextField
          required
          margin="normal"
          label="Email"
          variant="filled"
          sx={{ width: "50%" }}
          InputProps={{
            disableUnderline: true,
          }}
          type="email"
          name="email"
          id="email"
          error={emailError}
          helperText={
            emailError ? "An account with that email does not exist" : ""
          }
        ></TextField>
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "50%", marginTop: "5%" }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          onClick={(e) => handleClose()}
          sx={{ width: "50%", marginTop: "2.5%", bgcolor: "primary.light" }}
        >
          Close
        </Button>
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
  );
};

export default ForgotPasswordBox;
