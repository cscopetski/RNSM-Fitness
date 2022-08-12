import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Navigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
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
import FoodList from "../../Components/FoodPage/FoodList";
import { Box } from "@mui/system";
import FoodDisplay from "../../Components/FoodPage/FoodDisplay";
import FoodListHeader from "../../Components/FoodPage/FoodListHeader";
import DailyMeal from "../../Components/DailyFoodLog/DailyMeal";
import DailyFoodListHeader from "../../Components/DailyFoodLog/DailyFoodListHeader";
import { getDailyFoodLog } from "../../lib/daily_food_log";
import { addDaysToDate, getDate } from "../../lib/Date";
import Loading from "../../Components/Loading";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const DailyFood = ({ token }) => {
  const [sortBy, setSortBy] = useState("name");
  const [ascending, setAscending] = useState(true);
  const [foods, setFoods] = useState();
  const [refresh, setRefresh] = useState(0);
  const [date, setDate] = useState(new Date());

  const changeSort = (sort) => {
    if (sortBy === sort) {
      setAscending(!ascending);
    } else {
      setSortBy(sort);
      setAscending(true);
    }
  };

  const handleRefresh = () => {
    if (refresh >= 100) {
      setRefresh(0);
    } else {
      setRefresh(refresh + 1);
    }
  };

  const handleSubtractDate = () => {
    setDate(addDaysToDate(date, -1));
  };

  const handleAddDate = () => {
    setDate(addDaysToDate(date, 1));
  };

  useEffect(() => {
    if (token !== undefined) {
      getDailyFoodLog()
        .then((data) => {
          console.log("Test");
          setFoods(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [refresh, date]);

  if (foods === undefined) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div>
      {!token && <Navigate to="/account/login" />}

      <CssBaseline />

      <main>
        <div>
          <Container maxWidth="md">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h3" gutterBottom sx={{ color: "black" }}>
                Daily Food
              </Typography>
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
                  flexDirection: "row",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Button onClick={(e) => handleSubtractDate()}>
                  <ArrowBackIosIcon></ArrowBackIosIcon>
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Typography variant="h4" gutterBottom>
                    {getDate(date)}
                  </Typography>
                </Box>

                <Button onClick={(e) => handleAddDate()}>
                  <ArrowForwardIosIcon></ArrowForwardIosIcon>
                </Button>
              </Box>
            </Box>

            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              <FoodListHeader changeSort={changeSort}></FoodListHeader>
              <DailyMeal
                foodsInput={foods}
                mealName={"Breakfast"}
                sortBy={sortBy}
                ascending={ascending}
                refresh={handleRefresh}
              ></DailyMeal>
              <DailyMeal
                foodsInput={foods}
                mealName={"Lunch"}
                sortBy={sortBy}
                ascending={ascending}
                refresh={handleRefresh}
              ></DailyMeal>
              <DailyMeal
                foodsInput={foods}
                mealName={"Dinner"}
                sortBy={sortBy}
                ascending={ascending}
                refresh={handleRefresh}
              ></DailyMeal>
              <DailyMeal
                foodsInput={foods}
                mealName={"Snacks"}
                sortBy={sortBy}
                ascending={ascending}
                refresh={handleRefresh}
              ></DailyMeal>
            </List>
          </Container>
        </div>
      </main>
    </div>
  );
};

export default DailyFood;
