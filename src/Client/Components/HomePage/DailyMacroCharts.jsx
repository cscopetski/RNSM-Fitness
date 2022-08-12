import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Navigate } from "react-router-dom";
import Navbar from "../Navbar";
import {
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  TextField,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import FoodList from "../FoodPage/FoodList";
import { Box } from "@mui/system";
import FoodDisplay from "../FoodPage/FoodDisplay";
import FoodListHeader from "../FoodPage/FoodListHeader";
import DailyMeal from "../DailyFoodLog/DailyMeal";
import DailyFoodListHeader from "../DailyFoodLog/DailyFoodListHeader";
import { getDailyFoodLog } from "../../lib/daily_food_log";
import { addDaysToDate, getDate } from "../../lib/Date";
import Loading from "../Loading";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { CircularProgressWithLabel } from "./CircularProgressWithLabel";
import CalorieProgressBar from "../ProfilePage/CalorieProgressBar";
import { calculateTotalCalories } from "../../lib/Food";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Chart from "chart.js/auto";

Chart.register(ChartDataLabels);

export function DailyMacroCharts({ macroGoals }) {
  const totalCals = calculateTotalCalories(
    macroGoals.fat_results,
    macroGoals.carb_results,
    macroGoals.protein_results
  );

  const chartData = {
    labels: ["Carbs", "Fats", "Protein"],
    datasets: [
      {
        label: "Macro Distribution",
        data: [
          ((macroGoals.carb_results * 4) / totalCals) * 100,
          ((macroGoals.fat_results * 9) / totalCals) * 100,
          ((macroGoals.protein_results * 4) / totalCals) * 100,
        ],
        backgroundColor: ["#ffbb11", "#ecf0f1", "#50AF95"],
      },
    ],
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          maxHeight: "500px",
        }}
      >
        {macroGoals.carb_results +
          macroGoals.fat_results +
          macroGoals.protein_results ===
          0 ? (
          <div></div>
        ) : (
          <Pie
            data={chartData}
            options={{
              title: {
                display: true,
                text: "Macro Distribution",
                fontSize: 30,
              },
              legend: {
                display: true,
                position: "top",
              },
              plugins: {
                tooltip: {
                  enabled: true,
                  callbacks: {
                    label: function (tooltipItems, data) {
                      return (
                        tooltipItems.label +
                        ": " +
                        Math.round(tooltipItems.raw) +
                        "%" +
                        "\n\n\nCalories: " +
                        Math.round((tooltipItems.raw / 100) * totalCals)
                      );
                    },
                  },
                },
                datalabels: {
                  display: true,
                  formatter: (value, ctx) => {
                    if (value) {
                      return Math.round(value) + "%";
                    } else {
                      return "";
                    }
                  },
                },
                color: "#fff",
                backgroundColor: "#404040",
              },
              responsive: true,
              maintainAspectRatio: true,
            }}
          ></Pie>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgressWithLabel
          title="Carbs"
          displayValue={macroGoals.carb_results}
          displayGoal={macroGoals.carb_goal}
          value={(macroGoals.carb_results / macroGoals.carb_goal) * 100}
        ></CircularProgressWithLabel>
        <CircularProgressWithLabel
          title="Fat"
          displayValue={macroGoals.fat_results}
          displayGoal={macroGoals.fat_goal}
          value={(macroGoals.fat_results / macroGoals.fat_goal) * 100}
        ></CircularProgressWithLabel>
        <CircularProgressWithLabel
          title="Protein"
          displayValue={macroGoals.protein_results}
          displayGoal={macroGoals.protein_goal}
          value={(macroGoals.protein_results / macroGoals.protein_goal) * 100}
        ></CircularProgressWithLabel>
      </Box>
      <Box sx={{ width: "100%" }}>
        <CalorieProgressBar
          curCalories={macroGoals.calorie_results}
          calorieGoal={macroGoals.calorie_goal}
        ></CalorieProgressBar>
      </Box>
    </Box>
  );
}
