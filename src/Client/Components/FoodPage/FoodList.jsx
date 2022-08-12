import Box from "@mui/material/Box";
import {
  Button,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemSecondaryAction,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import MacroTextInput from "./MacroTextInput";
import React, { useState, useEffect } from "react";
import SelectionBox from "./SelectionBox";
import UnitsSelectionInput from "./UnitsSelectionInput";
import { compare, getAllUserFoods, insertFood } from "../../lib/Food";
import SuccessFailureMessage from "../Success-FailureMessage";
import FoodDisplay from "./FoodDisplay";
import FoodListHeader from "./FoodListHeader";
import Loading from "../Loading";
import { Link, Navigate } from "react-router-dom";
import { Add, Compare, CompareRounded, Edit } from "@mui/icons-material";
import EditFoodDialog from "./EditFoodDialog";
import AddFoodToLogBox from "../DailyFoodLog/AddFoodToLogBox";
import AddFoodDialog from "../DailyFoodLog/AddFoodDialog";
import FoodBox from "./CreateFoodBox";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SearchIcon from "@mui/icons-material/Search";
import EditFoodBox from "./EditFoodBox";

function FoodList({ token, foodList = true, input_meal = "Breakfast", date, inDialog = false }) {
  const innerBorder = 3;
  const outerBorder = 5;

  const [sortBy, setSortBy] = useState("name");
  const [ascending, setAscending] = useState(true);
  const [searchParam, setSearchParam] = useState("");
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [currentFood, setCurrentFood] = useState("");
  const [editId, setEditId] = useState();
  const [foods, setFoods] = useState();
  const [inputErrors, setInputErrors] = useState(false);
  const [inputSuccess, setInputSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (token !== undefined) {
      getAllUserFoods()
        .then((data) => {
          setFoods(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [open, openCreate]);

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleSearch = (search) => {
    setSearchParam(search);
  };
  const openEdit = (id) => {
    setEditId(id);
    setOpen(true);
  };

  const handleCloseAddFood = () => {
    setOpenAdd(false);
  };

  const openAddFood = (food) => {
    setCurrentFood(food);
    setOpenAdd(true);
  };

  const handleCloseCreateFood = () => {
    setOpenCreate(false);
  };

  const openCreateFood = () => {
    setOpenCreate(true);
  };

  if (foods === undefined) {
    return (
      <>
        <Loading margin={20} minHeight={inDialog ? "1000px" : "0px"} />
      </>
    );
  }

  const filteredFoods = foods.filter((food) => {
    if (searchParam === "") {
      return food;
    } else {
      return food.name.toLowerCase().includes(searchParam);
    }
  });

  return (
    <Box>
      <Box>
        <SuccessFailureMessage
          success={inputSuccess}
          successMessage={successMessage}
          failure={inputErrors}
          failureMessage={errorMessage}
          setFailure={setInputErrors}
          setSuccess={setInputSuccess}
        ></SuccessFailureMessage>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          bgcolor: "primary.dark",
          borderRadius: 2,
          paddingBottom: 1,
          paddingTop: 3,
          boxShadow: 4,
        }}
      >
        <Box>
          <Box sx={{ display: "flex", width: "100%" }}>
            <Box sx={{ width: "25%", marginLeft: "2.5%" }}>
              <TextField
                type="text"
                inputProps={{ maxLength: 100 }}
                variant="outlined"
                label="Search Foods"
                value={searchParam}
                onChange={(e) => handleSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon></SearchIcon>
                    </InputAdornment>
                  ),
                }}
                sx={{ bgcolor: "background.darkPaper", borderRadius: 2 }}
              />
            </Box>
            <Box sx={{ width: "50%" }}></Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "20%",
                alignContent: "center",
                justifyContent: "center",
                marginRight: "2.5%",
              }}
            >
              <Button
                variant="filled"
                startIcon={<RestaurantIcon></RestaurantIcon>}
                onClick={(e) => openCreateFood()}
                sx={{ bgcolor: "background.darkPaper", borderRadius: 2 }}
              >
                Create Food
              </Button>
            </Box>
          </Box>

          <FoodListHeader
            changeSort={changeSort}
            sort={sortBy}
          ></FoodListHeader>
        </Box>
        <AddFoodDialog
          title={"Create New Food"}
          open={openCreate}
          handleClose={handleCloseCreateFood}
          content={
            <FoodBox
              title={false}
              handleClose={handleCloseCreateFood}
              setInputErrors={setInputErrors}
              setInputSuccess={setInputSuccess}
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
            ></FoodBox>
          }
          width="sm"
        ></AddFoodDialog>
        <AddFoodDialog
          open={openAdd}
          handleClose={handleCloseAddFood}
          content={
            <AddFoodToLogBox
              date={date}
              food={currentFood}
              input_meal={input_meal}
              handleClose={handleCloseAddFood}
              setInputErrors={setInputErrors}
              setInputSuccess={setInputSuccess}
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
            ></AddFoodToLogBox>
          }
          width="sm"
        ></AddFoodDialog>
        <AddFoodDialog
          title="Edit Food"
          open={open}
          width="sm"
          handleClose={handleClose}
          content={
            <EditFoodBox
              id={editId}
              handleClose={handleClose}
              setInputErrors={setInputErrors}
              setInputSuccess={setInputSuccess}
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
            ></EditFoodBox>
          }
        ></AddFoodDialog>
        <List
          sx={{
            maxHeight: 450,
            overflow: "auto",
            bgcolor: "background.darkPaper",
            paddingRight: 1,
            paddingLeft: 1,
          }}
        >
          {filteredFoods.length === 0 ? (
            <Typography variant="h5" align="center" gutterBottom>
              No Results
            </Typography>
          ) : (
            filteredFoods
              .sort((a, b) => compare(a, b, ascending, sortBy))
              .map((food) => (
                <ListItem variant="food" disableGutters key={food.id}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "95%",
                    }}
                  >
                    <FoodDisplay
                      key={food.id}
                      name={food.name}
                      protein={food.protein}
                      fat={food.fat}
                      carbs={food.carbs}
                      calories={food.calories}
                      servingSize={food.serving_size}
                      servingUnits={food.serving_units}
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
                          openEdit(food.id);
                        }}
                      >
                        <Edit variant="food" />
                      </IconButton>
                      <IconButton
                        aria-label="add"
                        onClick={() => {
                          openAddFood(food);
                        }}
                      >
                        <Add variant="food" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </Box>
                </ListItem>
              ))
          )}
        </List>
      </Box>
    </Box>
  );
}

export default FoodList;
