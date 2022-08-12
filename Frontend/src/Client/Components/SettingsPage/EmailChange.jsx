import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import SuccessFailureMessage from "../Success-FailureMessage";
import { changeEmail } from "../../lib/User";

const EmailChange = ({ currEmail = "" }) => {
  const [inputErrors, setInputErrors] = useState(false);
  const [inputSuccess, setInputSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    let body = { newEmail: data.get("newemail") };
    changeEmail(body)
      .then(() => {
        setInputSuccess(true);
        setInputErrors(false);
      })
      .catch((err) => {
        setInputErrors(true);
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
          marginTop: "5%",
          marginBottom: "5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "5%" }}>
          Change Email
        </Typography>
        <TextField
          margin="normal"
          name="curremail"
          type="email"
          id="curremail"
          label="Current Email"
          value={currEmail}
          variant="filled"
          sx={{ width: "75%" }}
          InputProps={{
            disableUnderline: true,
            readOnly: true,
          }}
        />
        <TextField
          required
          margin="normal"
          error={inputErrors ? true : false}
          helperText={
            inputErrors
              ? "An account with that email already exists"
              : undefined
          }
          name="newemail"
          type="email"
          id="newemail"
          label="New Email"
          variant="filled"
          sx={{ width: "75%" }}
          InputProps={{
            disableUnderline: true,
          }}
        />
        <SuccessFailureMessage
          success={inputSuccess}
          successMessage={"Verification email successfully sent"}
          setFailure={setInputErrors}
          setSuccess={setInputSuccess}
        ></SuccessFailureMessage>
        <Button
          variant="contained"
          type="submit"
          sx={{ width: "30%", marginTop: "5%" }}
        >
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default EmailChange;
