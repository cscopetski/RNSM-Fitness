import React, { useState, useEffect } from "react";
import { Button, IconButton } from "@mui/material";
import {
  Collapse,
  List,
  ListItem,
  ListItemSecondaryAction,
} from "@mui/material";
import { Delete, Edit, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, useTheme } from "@mui/system";
import FoodDisplay from "../FoodPage/FoodDisplay";
import { compare } from "../../lib/Food";
import AddFoodDialog from "./AddFoodDialog";
import AddFoodLogBox from "./AddFoodLogBox";
import { deleteDailyFood } from "../../lib/daily_food_log";
import EditFoodLogBox from "./EditFoodLogBox";

const DailyMeal = ({
  foodsInput,
  date,
  mealName,
  sortBy,
  ascending,
  refresh = () => { },
}) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openMeal, setOpenMeal] = useState(false);
  const [curDeleteId, setCurDeleteId] = useState(-1);
  const [curEditId, setCurEditId] = useState(-1);
  const [foods, setFoods] = useState(
    foodsInput.filter((food) => food.meal === mealName.toLowerCase())
  );
  const [foodTotals, setFoodTotals] = useState({
    protein: 0,
    fat: 0,
    carbs: 0,
    calories: 0,
  });

  const theme = useTheme();

  useEffect(() => {
    const filteredFoods = foodsInput.filter(
      (food) => food.meal === mealName.toLowerCase()
    );

    setFoods(filteredFoods);
    getTotals(filteredFoods);
  }, [foodsInput]);

  const handleClickMeal = () => {
    setOpenMeal(!openMeal);
  };

  const openEditFood = (id) => {
    setCurEditId(id);
    setOpenEdit(true);
  };

  const closeEditFood = () => {
    setOpenEdit(false);
    refresh();
  };

  const openDelete = (id) => {
    if (id !== curDeleteId) {
      setCurDeleteId(id);
      deleteDailyFood(id).catch((err) => {
        console.log(err);
      });
      refresh();
    }
  };

  const openAddFood = () => {
    setOpenAdd(true);
  };

  const closeAddFood = () => {
    setOpenAdd(false);
    refresh();
  };

  const getTotals = (new_foods) => {
    const foodTotal = {
      protein: 0,
      fat: 0,
      carbs: 0,
      calories: 0,
    };

    new_foods.forEach((food) => {
      foodTotal.protein += Math.round(food.protein * food.quantity);
      foodTotal.fat += Math.round(food.fat * food.quantity);
      foodTotal.carbs += Math.round(food.carbs * food.quantity);
      foodTotal.calories += Math.round(food.calories * food.quantity);
    });

    setFoodTotals(foodTotal);
  };

  return (
    <Box>
      <AddFoodDialog
        title="Edit Food"
        open={openEdit}
        handleClose={closeEditFood}
        width="sm"
        content={
          <EditFoodLogBox
            food_id={curEditId}
            handleClose={closeEditFood}
            meal={mealName}
          ></EditFoodLogBox>
        }
      ></AddFoodDialog>
      <AddFoodDialog
        open={openAdd}
        handleClose={closeAddFood}
        width="md"
        content={
          <AddFoodLogBox
            date={date}
            handleClose={closeAddFood}
            meal={mealName}
          ></AddFoodLogBox>
        }
      ></AddFoodDialog>

      <Button
        className="list-header-button"
        onClick={handleClickMeal}
        variant="filled"
        // color="background.paper"
        sx={{
          paddingTop: "1%",
          paddingBottom: "1%",
          paddingLeft: 0,
          paddingRight: 0,
          width: "100%",
          borderRadius: 0,
          display: "flex",
          flexDirection: "row",
          bgcolor: "primary.light",
        }}
      >
        <Box
          sx={{
            width: "95%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FoodDisplay
            key={-1}
            name={mealName}
            protein={foodTotals.protein}
            fat={foodTotals.fat}
            carbs={foodTotals.carbs}
            calories={foodTotals.calories}
          ></FoodDisplay>
        </Box>

        <Box
          sx={{
            marginLeft: "5%",
            width: "5%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {openMeal ? <ExpandLess /> : <ExpandMore />}
        </Box>
      </Button>

      <Collapse in={openMeal}>
        <List
          sx={{
            maxHeight: 300,
            overflow: "auto",
            bgcolor: "background.darkPaper",
            paddingRight: 1,
            paddingLeft: 1,
          }}
        >
          {foods
            .sort((a, b) =>
              compare(a, b, ascending, sortBy, a.quantity, b.quantity, true)
            )
            .map((food) => (
              <ListItem variant="food" disableGutters key={food.id}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "97%",
                  }}
                >
                  <FoodDisplay
                    key={food.id}
                    name={food.name}
                    protein={Math.round(food.protein * food.quantity)}
                    fat={Math.round(food.fat * food.quantity)}
                    carbs={Math.round(food.carbs * food.quantity)}
                    calories={Math.round(food.calories * food.quantity)}
                    servingSize={Math.round(food.serving_size * food.quantity)}
                  ></FoodDisplay>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "10%",
                  }}
                >
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        openEditFood(food.id);
                      }}
                    >
                      <Edit variant="food" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        openDelete(food.id);
                      }}
                    >
                      <Delete variant="food" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </Box>
              </ListItem>
            ))}

          {/* <ListItem disableGutters>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingRight: "5%",
                width: "95%",
              }}
            >
              <FoodDisplay
                key={-1}
                name={"Total: "}
                protein={foodTotals.protein}
                fat={foodTotals.fat}
                carbs={foodTotals.carbs}
                calories={foodTotals.calories}
              ></FoodDisplay>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "5%",
              }}
            ></Box>
          </ListItem> */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
            }}
          >
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignContent: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={(e) => {
                  openAddFood();
                }}
                sx={{
                  display: "flex",

                  width: "50%",
                  alignContent: "center",
                }}
              >
                Add Food
              </Button>
            </ListItem>
          </Box>
        </List>
      </Collapse>
    </Box>
  );
};

export default DailyMeal;
