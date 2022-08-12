import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import SuccessFailureMessage from "../Success-FailureMessage";
import SexInput from "../SignupPage/SexInput";
import { updateUser } from "../../lib/User";

const SexChange = ({ currSex }) => {
  const [inputErrors, setInputErrors] = useState(undefined);
  const [inputSuccess, setInputSuccess] = useState(undefined);
  const [sex, setSex] = useState(currSex);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUser({ gender: sex })
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
          Change Sex
        </Typography>
        <SexInput setGender={setSex} currSex={currSex}></SexInput>
        <SuccessFailureMessage
          success={inputSuccess}
          failure={inputErrors}
          successMessage="Successfully changed sex"
          failureMessage="Error changing sex"
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

export default SexChange;
