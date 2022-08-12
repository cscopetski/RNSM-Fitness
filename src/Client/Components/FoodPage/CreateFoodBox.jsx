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
import MacroTextInput from "./MacroTextInput";
import React, { useState } from "react";
import SelectionBox from "./SelectionBox";
import UnitsSelectionInput from "./UnitsSelectionInput";
import { calculateTotalCalories, insertFood } from "../../lib/Food";
import SuccessFailureMessage from "../Success-FailureMessage";

function FoodBox({
  title = true,
  handleClose = () => {},
  setInputErrors = () => {},
  setInputSuccess = () => {},
  setErrorMessage = () => {},
  setSuccessMessage = () => {},
}) {
  const innerBorder = 0;
  const outerBorder = 0;

  const servingUnits = ["grams", "cups"];

  const [protein, setProtein] = useState("");
  const [carb, setCarb] = useState("");
  const [fat, setFat] = useState("");
  const [servingUnit, setServingUnit] = useState(servingUnits[0]);
  const [servingSize, setServingSize] = useState("");
  const [name, setName] = useState("");

  // const [inputErrors, setInputErrors] = useState(false);
  // const [inputSuccess, setInputSuccess] = useState(false);

  // const clearFields = () => {
  //   setProtein("");
  //   setCarb("");
  //   setFat("");
  //   setServingUnit(servingUnits[0]);
  //   setServingSize("");
  //   setName("");
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    insertFood(name, servingSize, fat, carb, protein)
      .then(() => {
        setInputErrors(false);
        setInputSuccess(true);
        setSuccessMessage("Successfully created new food");
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        setInputErrors(true);
        setInputSuccess(false);
        setErrorMessage("Error creating new food");
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        border: outerBorder,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {title ? (
        <Typography variant="h4" align="center" gutterBottom>
          Add Food
        </Typography>
      ) : (
        <div></div>
      )}

      <Box
        sx={{
          border: innerBorder,
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
          width: "100%",
        }}
      >
        <TextField
          sx={{
            width: "100%",
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          type="text"
          label="Food Name"
          variant="filled"
          inputProps={{ maxLength: 40 }}
          InputProps={{
            disableUnderline: true,
          }}
        ></TextField>
      </Box>
      <Box
        sx={{
          border: innerBorder,
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
        }}
      >
        <UnitsSelectionInput
          value={servingSize}
          setValue={setServingSize}
          units={servingUnit}
          setUnits={setServingUnit}
          name="Serving Size"
          unitsSelection={servingUnits}
        ></UnitsSelectionInput>
      </Box>
      <Box
        sx={{
          border: innerBorder,
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
        }}
      >
        <MacroTextInput
          name="Protein"
          value={protein}
          setValue={setProtein}
        ></MacroTextInput>
      </Box>
      <Box
        sx={{
          border: innerBorder,
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
        }}
      >
        <MacroTextInput
          name="Carb"
          value={carb}
          setValue={setCarb}
        ></MacroTextInput>
      </Box>
      <Box
        sx={{
          border: innerBorder,
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
        }}
      >
        <MacroTextInput
          name="Fat"
          value={fat}
          setValue={setFat}
        ></MacroTextInput>
      </Box>
      <Box
        sx={{
          border: innerBorder,
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
        }}
      >
        <TextField
          sx={{
            width: "100%",
          }}
          type="number"
          id="calories"
          label="Calories"
          value={calculateTotalCalories(fat, carb, protein)}
          variant="filled"
          InputProps={{
            disableUnderline: true,
            readOnly: true,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          type="submit"
          sx={{ width: "50%", marginTop: "5%" }}
        >
          Create Food
        </Button>
        <Button
          onClick={(e) => handleClose()}
          variant="contained"
          sx={{ bgcolor: "primary.light", width: "50%", marginTop: "2.5%" }}
        >
          Cancel
        </Button>
      </Box>

      {/* <SuccessFailureMessage
        success={inputSuccess}
        successMessage="Food successfully added"
        failure={inputErrors}
        failureMessage="Failed to add food"
      ></SuccessFailureMessage> */}
    </Box>
  );
}

export default FoodBox;
