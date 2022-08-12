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
import EditFoodBox from "./EditFoodBox";
import Loading from "../Loading";

const EditFoodDialog = ({ food_id, open = false, handleClose }) => {
  const [food, setFood] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (food_id !== undefined && open === true) {
      getFood(food_id)
        .then((data) => {
          if (data === undefined) {
            handleClose();
            return;
          }
          setFood(data);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          handleClose();
          return;
        });
    } else {
      handleClose();
      return;
    }
  }, [open]);

  const close = () => {
    handleClose();
    setFood(undefined);
  };

  return (
    <Dialog
      PaperComponent={Paper}
      sx={{ justifyContent: "center" }}
      maxWidth="xs"
      fullWidth={true}
      open={open}
      onClose={close}
    >
      <DialogTitle sx={{ alignSelf: "center" }}>Edit Food</DialogTitle>
      <DialogContent>
        {food === undefined ? (
          <Loading />
        ) : (
          <EditFoodBox
            id={food_id}
            protein_input={food.protein}
            fat_input={food.fat}
            carb_input={food.carbs}
            name_input={food.name}
            servingSize_input={food.serving_size}
            handleClose={handleClose}
          ></EditFoodBox>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditFoodDialog;
