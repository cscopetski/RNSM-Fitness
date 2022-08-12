import React from "react";
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
