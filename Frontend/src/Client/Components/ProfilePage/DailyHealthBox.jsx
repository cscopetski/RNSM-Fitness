import React, { useState } from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import {
  Button,
  FormControlLabel,
  FormGroup,
  Input,
  LinearProgress,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { maxHeight, maxWidth } from "@mui/system";
import GoalBox from "./GoalBox";
import CalorieProgressBar from "./CalorieProgressBar";
import SectionBox from "./SectionBox";
import WeightTextField, { toLbs } from "../SignupPage/WeightTextField";
import WeightDiffBox from "./WeightDiffBox";

function DailyHealthBox({
  initial_weight,
  currentWeight,
  updateDailyLog,
  units = "imperial",
}) {
  const innerBorder = 0;
  const outerBorder = 0;

  const [formWeight, setFormWeight] = useState(currentWeight);

  const handleSubmit = () => {
    updateDailyLog({ weight_results: formWeight });
  };

  return (
    <Box
      sx={{
        bgcolor: "background.darkPaper",
        width: "100%",
        borderRadius: 2,
        boxShadow: 4,
      }}
    >
      <Box
        sx={{
          border: outerBorder,
          padding: 2,
          display: "flex",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "top",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 1,
              width: "50%",
              bgcolor: "primary.light",
              borderRadius: 2,
              marginRight: "1%",
            }}
          >
            <SectionBox
              name="Weight"
              currentFigure={
                units === "imperial" ? toLbs(currentWeight) : currentWeight
              }
              units={units === "imperial" ? "(lbs)" : "(kg)"}
            />
          </Box>
          <Box
            sx={{
              borderLeft: innerBorder,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 1,
              width: "50%",
              bgcolor: "primary.light",
              borderRadius: 2,
              marginLeft: "1%",
            }}
          >
            <WeightDiffBox
              name="Weight"
              label={"(-/+)"}
              currentWeight={currentWeight}
              initialWeight={initial_weight}
              units={units}
            ></WeightDiffBox>
          </Box>
        </Box>
        <Box
          type="form"
          onSubmit={handleSubmit}
          sx={{
            borderTop: innerBorder,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 1,
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 1,
            }}
          >
            <Typography variant="h5">Update Today's Weight: </Typography>
            <WeightTextField
              units={units}
              setWeight={setFormWeight}
            ></WeightTextField>
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default DailyHealthBox;
