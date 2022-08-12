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
import AddFoodDialog from "../DailyFoodLog/AddFoodDialog";
import ForgotPasswordBox from "./ForgotPasswordBox";

const ForgotPasswordButton = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box>
      <AddFoodDialog
        title="Forgot Password"
        open={open}
        handleClose={handleClose}
        content={<ForgotPasswordBox handleClose={handleClose} />}
        width="sm"
      ></AddFoodDialog>
      <Button
        variant="contained"
        onClick={(e) => handleOpen()}
        sx={{
          alignText: "center",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          bgcolor: "primary.light",
          width: "100%",
        }}
      >
        Forgot Password
      </Button>
    </Box>
  );
};

export default ForgotPasswordButton;
