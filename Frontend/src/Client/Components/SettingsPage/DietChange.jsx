import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PercentSlider from "./PercentSlider";
import SuccessFailureMessage from "../Success-FailureMessage";
import MacroPercentSlider from "./MacroPercentSlider";
import { calculateMacros } from "../../lib/Food.js";
import { updateHealthProfile } from "../../lib/User";

function DietChange({
  currProteinPercent = 0.25,
  currFatPercent = 0.25,
  currCarbPercent = 0.5,
  currTotalCalories = 3000,
}) {
  const [proteinPercent, setProteinPercent] = useState(currProteinPercent);
  const [totalCalories, setTotalCalories] = useState(currTotalCalories);
  const [fatPercent, setFatPercent] = useState(currFatPercent);
  const [carbPercent, setCarbPercent] = useState(currCarbPercent);
  const [totalPercent, setTotalPercent] = useState(
    currProteinPercent + currFatPercent + currCarbPercent
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [inputErrors, setInputErrors] = useState(false);
  const [inputSuccess, setInputSuccess] = useState(false);

  const macros = calculateMacros(
    totalCalories,
    fatPercent,
    carbPercent,
    proteinPercent
  );

  const handleCalorieChange = (e) => {
    setTotalCalories(e.target.value);
  };

  const handleProteinChange = (e) => {
    if (handlePercentChange(e.target.value, "protein")) {
      setProteinPercent(e.target.value);
    }
  };
  const handleFatChange = (e) => {
    if (handlePercentChange(e.target.value, "fat")) {
      setFatPercent(e.target.value);
    }
  };
  const handleCarbChange = (e) => {
    if (handlePercentChange(e.target.value, "carb")) {
      setCarbPercent(e.target.value);
    }
  };

  const handlePercentChange = (percent, type) => {
    let protein = proteinPercent;
    let carb = carbPercent;
    let fat = fatPercent;

    switch (type) {
      case "protein":
        protein = percent;
        break;
      case "fat":
        fat = percent;
        break;
      case "carb":
        carb = percent;
        break;

      default:
        break;
    }

    let range = protein + fat + carb <= 1.0;

    if (range) {
      setTotalPercent(protein + fat + carb);
    }
    return range;
  };

  const handleSubmit = () => {
    if (totalPercent === 1.0) {
      let data = {
        protein_goal_ratio: proteinPercent,
        fat_goal_ratio: fatPercent,
        carb_goal_ratio: carbPercent,
        calorie_goal: totalCalories,
      };

      updateHealthProfile(data)
        .then(() => {
          setInputSuccess(true);
          setInputErrors(false);
        })
        .catch((err) => {
          setInputErrors(true);
          setInputSuccess(false);
          setErrorMessage("Error updating diet profile");
          console.log(err);
        });
    } else {
      setInputErrors(true);
      setInputSuccess(false);
      setErrorMessage("Total percentage must equal 100%");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",

              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              margin: "10%",
            }}
          >
            <TextField
              name="calorie"
              type="number"
              id="calorie"
              label="Calorie Total"
              value={totalCalories}
              variant="filled"
              onChange={(e) => handleCalorieChange(e)}
              sx={{ width: "50%" }}
              InputProps={{
                endAdornment: <InputAdornment position="end">g</InputAdornment>,
                disableUnderline: true,
              }}
            />
          </Box>
          { }
          <MacroPercentSlider
            title="Carb"
            currPercent={carbPercent}
            setPercent={handleCarbChange}
            macroGrams={macros.carbs}
          ></MacroPercentSlider>
          <MacroPercentSlider
            title="Fat"
            currPercent={fatPercent}
            setPercent={handleFatChange}
            macroGrams={macros.fat}
          ></MacroPercentSlider>
          <MacroPercentSlider
            title="Protein"
            currPercent={proteinPercent}
            setPercent={handleProteinChange}
            macroGrams={macros.protein}
          ></MacroPercentSlider>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "left",
            }}
          >
            <Typography>Total: </Typography>
            <PercentSlider currPercent={totalPercent}></PercentSlider>
          </Box>

          <Button
            variant="contained"
            type="submit"
            sx={{ width: "50%", marginTop: "5%" }}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
          <SuccessFailureMessage
            successMessage="Successfully updated diet profile"
            success={inputSuccess}
            failureMessage={errorMessage}
            failure={inputErrors}
            setFailure={setInputErrors}
            setSuccess={setInputSuccess}
          ></SuccessFailureMessage>
        </Box>
      </Box>
    </Container>
  );
}

export default DietChange;
