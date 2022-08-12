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
import { updateUser } from "../../lib/User";

const BirthdayChange = ({ userID, currDOB }) => {
  const [inputErrors, setInputErrors] = useState(undefined);
  const [inputSuccess, setInputSuccess] = useState(undefined);
  const [dob, setDOB] = useState(currDOB);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUser({ dob: dob })
      .then(() => {
        setInputSuccess("Successfully changed birthday");
        setInputErrors(undefined);
      })
      .catch((err) => {
        setInputErrors("Error changing birthday");
        setInputSuccess(undefined);
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
          Change Birthday
        </Typography>

        <DateInput setDOB={setDOB} currBirthday={currDOB}></DateInput>

        <SuccessFailureMessage
          success={inputSuccess}
          failure={inputErrors}
          successMessage="Successfully changed birthday"
          failureMessage="Error changing birthday"
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

export default BirthdayChange;
