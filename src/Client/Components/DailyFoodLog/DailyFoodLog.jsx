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
import DailyMeal from "./DailyMeal";
import DailyFoodListHeader from "./DailyFoodListHeader";
import { getDailyFoodLog } from "../../lib/daily_food_log";
import { addDaysToDate, getDate } from "../../lib/Date";
import Loading from "../Loading";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { CircularProgressWithLabel } from "../HomePage/CircularProgressWithLabel";
import CalorieProgressBar from "../ProfilePage/CalorieProgressBar";
import { DailyMacroCharts } from "../HomePage/DailyMacroCharts";

const DailyFoodLog = ({ foods, date, reload = () => { } }) => {
  const [sortBy, setSortBy] = useState("name");
  const [ascending, setAscending] = useState(true);

  const changeSort = (sort) => {
    if (sortBy === sort) {
      setAscending(!ascending);
      return !ascending;
    } else {
      setSortBy(sort);
      setAscending(true);
      return true;
    }
  };

  const handleRefresh = () => {
    reload();
  };

  if (foods === undefined) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <List
        sx={{
          width: "100%",
          bgcolor: "primary.dark",
          borderRadius: 2,
          boxShadow: 4,
        }}
      >
        <FoodListHeader
          sx={{ width: "100%" }}
          changeSort={changeSort}
          sort={sortBy}
        ></FoodListHeader>
        <DailyMeal
          date={date}
          foodsInput={foods}
          mealName={"Breakfast"}
          sortBy={sortBy}
          ascending={ascending}
          refresh={handleRefresh}
        ></DailyMeal>
        <DailyMeal
          date={date}
          foodsInput={foods}
          mealName={"Lunch"}
          sortBy={sortBy}
          ascending={ascending}
          refresh={handleRefresh}
        ></DailyMeal>
        <DailyMeal
          date={date}
          foodsInput={foods}
          mealName={"Dinner"}
          sortBy={sortBy}
          ascending={ascending}
          refresh={handleRefresh}
        ></DailyMeal>
        <DailyMeal
          date={date}
          foodsInput={foods}
          mealName={"Snacks"}
          sortBy={sortBy}
          ascending={ascending}
          refresh={handleRefresh}
        ></DailyMeal>
      </List>
    </Box>
  );
};

export default DailyFoodLog;
