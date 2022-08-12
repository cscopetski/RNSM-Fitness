import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import SelectionBox from "../FoodPage/SelectionBox";

const MealSelector = ({ value = "Breakfast", setValue = () => { } }) => {
  const handleChange = (e) => {
    setValue(e);
  };

  return (
    <SelectionBox
      name="Meal Category"
      value={value.charAt(0).toUpperCase() + value.slice(1)}
      selections={["Breakfast", "Lunch", "Dinner", "Snacks"]}
      setValue={handleChange}
    ></SelectionBox>
  );
};

export default MealSelector;
