import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import SuccessFailureMessage from "../Success-FailureMessage";
import { getFood } from "../../lib/Food";
import Loading from "../Loading";
import AddFoodLogBox from "./AddFoodLogBox";
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
