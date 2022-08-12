import React, { useState } from "react";
import { Box, Button } from "@mui/material";
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
