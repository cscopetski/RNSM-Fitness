import React from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import GoalBox from "./GoalBox";
import CalorieProgressBar from "./CalorieProgressBar";

function DailyGoalBox({ macroData }) {
  const units = "(g)";

  const innerBorder = 3;
  const outerBorder = 5;

  return (
    <Container>
      <CssBaseline />
      <Box
        sx={{
          border: outerBorder,
          marginTop: 10,
          marginBottom: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            borderBottom: outerBorder,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 1,
          }}
        >
          <Typography variant="h4">Daily Food Summary</Typography>
        </Box>
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
              width: "33%",
            }}
          >
            <GoalBox
              name="Carbs"
              currentFigure={macroData.carb_results}
              goalFigure={macroData.carb_goal}
              units={units}
            />
          </Box>
          <Box
            sx={{
              borderLeft: innerBorder,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 1,
              width: "33%",
            }}
          >
            <GoalBox
              name="Fats"
              currentFigure={macroData.fat_results}
              goalFigure={macroData.fat_goal}
              units={units}
            />
          </Box>

          <Box
            sx={{
              borderLeft: innerBorder,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 1,
              width: "33%",
            }}
          >
            <GoalBox
              name="Proteins"
              currentFigure={macroData.protein_results}
              goalFigure={macroData.protein_goal}
              units={units}
            />
          </Box>
        </Box>
        <Box
          sx={{
            borderTop: innerBorder,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 1,
          }}
        >
          <CalorieProgressBar
            curCalories={macroData.calorie_results}
            calorieGoal={macroData.calorie_goal}
          ></CalorieProgressBar>
        </Box>
      </Box>
    </Container>
  );
}

export default DailyGoalBox;
