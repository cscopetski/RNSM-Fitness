import Box from "@mui/material/Box";
import {
  Button,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import SuccessFailureMessage from "../Success-FailureMessage";
import FoodList from "../FoodPage/FoodList";

function AddFoodLogBox({ handleClose = () => {}, meal, date }) {
  const [selection, setSelection] = useState("hub");
  const [page, setPage] = useState();
  const [inputErrors, setInputErrors] = useState(false);
  const [inputSuccess, setInputSuccess] = useState(false);

  const handleSelection = (select) => {
    setSelection(select);
    setFoodPage(select);
  };

  const setFoodPage = (inputSelection) => {
    switch (inputSelection) {
      case "Your Foods":
        setPage(
          <Box sx={{ marginTop: "5%" }}>
            <FoodList
              date={date}
              token={"token"}
              foodList={false}
              input_meal={meal}
            ></FoodList>
          </Box>
        );
        break;
      case "Food Database":
        setPage(<Typography>Coming soon: FOOD DATABASE</Typography>);
        break;
      case "hub":
        setPage(
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: "5%",
                width: "50%",
              }}
            >
              <Button
                variant="contained"
                onClick={(e) => handleSelection("Your Foods")}
              >
                Select From Your Foods
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: "5%",
                width: "50%",
              }}
            >
              <Button
                variant="contained"
                onClick={(e) => handleSelection("Food Database")}
              >
                Select From Food Database
              </Button>
            </Box>
          </Box>
        );
        break;
      default:
        break;
    }
  };

  if (page === undefined) {
    setFoodPage(selection);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {page}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "5%",
        }}
      >
        <Button
          variant="contained"
          onClick={(e) => handleClose()}
          sx={{ bgcolor: "primary.light" }}
        >
          Done
        </Button>
      </Box>
      <SuccessFailureMessage
        success={inputSuccess}
        successMessage="Food successfully updated"
        failure={inputErrors}
        failureMessage="Failed to update food"
        setFailure={setInputErrors}
        setSuccess={setInputSuccess}
      ></SuccessFailureMessage>
    </Box>
  );
}

export default AddFoodLogBox;
