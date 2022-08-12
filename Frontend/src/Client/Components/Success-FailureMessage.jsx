import React from "react";
import { Alert, Box, Collapse } from "@mui/material";

function SuccessFailureMessage({
  successMessage = "",
  failureMessage = "",
  success = false,
  failure = false,
  setSuccess = () => { },
  setFailure = () => { },
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2.5%",
        marginBottom: "2.5%",
      }}
    >
      <Collapse in={success}>
        <Alert
          variant="filled"
          severity="success"
          onClose={() => {
            setSuccess(false);
          }}
          onClick={() => {
            setSuccess(false);
          }}
        >
          {successMessage}
        </Alert>
      </Collapse>
      <Collapse in={failure}>
        <Alert
          variant="filled"
          severity="error"
          onClose={() => {
            setFailure(false);
          }}
          onClick={() => {
            setFailure(false);
          }}
        >
          {failureMessage}
        </Alert>
      </Collapse>
    </Box>
  );
}

export default SuccessFailureMessage;
