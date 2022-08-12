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
import {
  addDaysToDate,
  convertDateToString,
  getDate,
  getDayofWeek,
} from "../../lib/Date";
import Loading from "../Loading";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const DateSelection = ({ date = "", setDate = () => { } }) => {
  const handleSubtractDate = () => {
    setDate(addDaysToDate(date, -1));
  };

  const handleAddDate = () => {
    setDate(addDaysToDate(date, 1));
  };

  return (
    <Box
      sx={{
        paddingTop: "2.5%",
        paddingBottom: "2.5%",
        display: "flex",
        width: "60%",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        bgcolor: "background.darkPaper",
        borderRadius: 2,
        boxShadow: 4,
      }}
    >
      <TextField
        type="date"
        name="dob"
        id="dob"
        value={getDate(date)}
        label="Date"
        variant="filled"
        InputLabelProps={{ shrink: true }}
        InputProps={{ disableUnderline: true }}
        onChange={(e) => setDate(e.target.value)}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignText: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Button
            onClick={(e) => handleSubtractDate()}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              alignText: "center",
            }}
          >
            <ArrowBackIosIcon></ArrowBackIosIcon>
          </Button>

          <Typography
            variant="h4"
            gutterBottom
            sx={{
              paddingTop: "2%",
            }}
          >
            {getDayofWeek(date)}, {convertDateToString(date)}
          </Typography>

          <Button
            onClick={(e) => handleAddDate()}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              alignText: "center",
            }}
          >
            <ArrowForwardIosIcon></ArrowForwardIosIcon>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DateSelection;
