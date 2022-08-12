import { List } from "@mui/material";
import React, { useState } from "react";
import { Box } from "@mui/system";
import FoodListHeader from "../FoodPage/FoodListHeader";
import DailyMeal from "./DailyMeal";
import Loading from "../Loading";
import "chart.js/auto";

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
