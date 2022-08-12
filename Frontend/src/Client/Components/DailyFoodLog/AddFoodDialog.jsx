import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/system";

const AddFoodDialog = ({
  title = "Add Food",
  open = false,
  handleClose,
  content,
  width = "md",
}) => {
  const close = () => {
    handleClose();
  };

  const theme = useTheme();

  return (
    <Dialog
      PaperComponent={Paper}
      PaperProps={{
        style: {
          backgroundColor: theme.palette.background.default,
        },
      }}
      sx={{
        justifyContent: "center",
        borderRadius: 2,
      }}
      maxWidth={width}
      fullWidth={true}
      open={open}
      onClose={close}
    >
      <DialogTitle sx={{ alignSelf: "center" }}>{title}</DialogTitle>
      <DialogContent sx={{ padding: "5%" }}>{content}</DialogContent>
    </Dialog>
  );
};

export default AddFoodDialog;
