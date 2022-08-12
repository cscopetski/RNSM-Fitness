import React from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Typography, LinearProgress } from "@mui/material";

function CalorieProgressBar({ curCalories, calorieGoal }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography variant="h5">Calories (kcal)</Typography>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingRight: 1,
          paddingLeft: 1,
          paddingTop: 1,
        }}
      >
        <LinearProgress
          variant="determinate"
          value={
            (curCalories / calorieGoal) * 100 <= 100
              ? (curCalories / calorieGoal) * 100
              : 100
          }
          sx={{
            width: "100%",
            height: 20,
          }}
        />
      </Box>
      <Typography variant="body1" color="text.secondary">{`${Math.round(
        (curCalories / calorieGoal) * 100
      )}%`}</Typography>
      <Typography variant="h6">
        {curCalories}/{calorieGoal}
      </Typography>
    </Box>
  );
}

export default CalorieProgressBar;
