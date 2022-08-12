import Box from "@mui/material/Box";
import {
  Button,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import SuccessFailureMessage from "../Success-FailureMessage";
import MacroTextInput from "../FoodPage/MacroTextInput";
import UnitsSelectionInput from "../FoodPage/UnitsSelectionInput";
import { calculateTotalCalories } from "../../lib/Food";
import MealSelector from "./MealSelector";
import {
  addFoodtoDailyFoodLog,
  editDailyFood,
  getDailyFood,
} from "../../lib/daily_food_log";
import { getDate } from "../../lib/Date";
import Loading from "../Loading";

function EditFoodLogBox({
  food_id,
  handleClose = () => {},
  setInputErrors = () => {},
  setInputSuccess = () => {},
}) {
  const innerBorder = 0;
  const outerBorder = 0;

  const [food, setFood] = useState();
  const [quantity, setQuantity] = useState(1.0);
  const [meal, setMeal] = useState();

  useEffect(() => {
    getDailyFood(food_id)
      .then((food) => {
        setFood(food);
        setQuantity(food.quantity);
        setMeal(food.meal);
        setInputSuccess(true);
        setInputErrors(false);
      })
      .catch((err) => {
        console.log(err);
        setInputSuccess(false);
        setInputErrors(true);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    editDailyFood(food.id, quantity, meal)
      .then((data) => {
        // setInputSuccess(true);
        // setInputErrors(false);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        // setInputErrors(true);
        // setInputSuccess(false);
      });
  };

  const handleQuantity = (e) => {
    const quan = e.target.value;

    if (!isNaN(parseFloat(quan))) {
      if (quan >= 0) {
        setQuantity(quan);
      } else {
        setQuantity(1);
      }
    } else {
      if (quan === "") {
        setQuantity(quan);
      }
    }
  };

  if (food === undefined) {
    return <Loading margin={200}></Loading>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        border: outerBorder,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            marginBottom: "5%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            width: "100%",
          }}
        >
          <TextField
            sx={{
              width: "100%",
            }}
            value={quantity}
            type="number"
            label="Quantity"
            variant="filled"
            onChange={(e) => handleQuantity(e)}
            InputProps={{
              disableUnderline: true,
            }}
          ></TextField>
        </Box>
        <Box
          sx={{
            border: innerBorder,
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            width: "100%",
          }}
        >
          <TextField
            sx={{
              width: "100%",
            }}
            value={food.name}
            type="text"
            label="Food Name"
            variant="filled"
            InputProps={{
              disableUnderline: true,
              readOnly: true,
            }}
          ></TextField>
        </Box>
        <Box
          sx={{
            border: innerBorder,
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
          }}
        >
          <UnitsSelectionInput
            sx={{
              width: "100%",
            }}
            value={Math.round(quantity * food.serving_size)}
            name="Serving Size"
            readOnly={true}
          ></UnitsSelectionInput>
        </Box>
        <Box
          sx={{
            border: innerBorder,
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
          }}
        >
          <MacroTextInput
            sx={{
              width: "100%",
            }}
            name="Protein"
            value={Math.round(quantity * food.protein)}
            readOnly={true}
          ></MacroTextInput>
        </Box>
        <Box
          sx={{
            border: innerBorder,
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
          }}
        >
          <MacroTextInput
            sx={{
              width: "100%",
            }}
            name="Carb"
            value={Math.round(quantity * food.carbs)}
            readOnly={true}
          ></MacroTextInput>
        </Box>
        <Box
          sx={{
            border: innerBorder,
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
          }}
        >
          <MacroTextInput
            sx={{
              width: "100%",
            }}
            name="Fat"
            value={Math.round(quantity * food.fat)}
            readOnly={true}
          ></MacroTextInput>
        </Box>
        <Box
          sx={{
            border: innerBorder,
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
          }}
        >
          <TextField
            sx={{
              width: "100%",
            }}
            type="number"
            id="calories"
            label="Calories"
            value={calculateTotalCalories(
              Math.round(quantity * food.fat),
              Math.round(quantity * food.carbs),
              Math.round(quantity * food.protein)
            )}
            variant="filled"
            InputProps={{
              disableUnderline: true,
              readOnly: true,
            }}
          />
        </Box>
        <Box
          sx={{
            marginTop: "5%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "5%",
          }}
        >
          <MealSelector value={meal} setValue={setMeal}></MealSelector>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button variant="contained" type="submit" sx={{ width: "50%" }}>
            Save Changes
          </Button>
          <Button
            variant="contained"
            onClick={(e) => handleClose()}
            sx={{ bgcolor: "primary.light", width: "50%", marginTop: "2.5%" }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default EditFoodLogBox;
