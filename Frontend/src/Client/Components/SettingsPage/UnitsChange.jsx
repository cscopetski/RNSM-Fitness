import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import UnitsButton from "../SignupPage/UnitsButton";
import SuccessFailureMessage from "../Success-FailureMessage";
import { updateUser } from "../../lib/User";

const UnitsChange = ({ currUnits }) => {
  const [inputErrors, setInputErrors] = useState();
  const [inputSuccess, setInputSuccess] = useState(false);
  const [units, setUnits] = useState(currUnits);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUser({ units: units })
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
          Change Units:
        </Typography>
        <Box sx={{ width: "30%" }}>
          <UnitsButton
            setParentUnits={setUnits}
            currUnits={currUnits}
          ></UnitsButton>
        </Box>

        <SuccessFailureMessage
          success={inputSuccess}
          successMessage={"Successfully changed units"}
          failure={inputErrors}
          failureMessage={"Error changing units"}
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

export default UnitsChange;
