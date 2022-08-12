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

import MacroTextInput from "./MacroTextInput";
import React, { useState } from "react";
import SelectionBox from "./SelectionBox";
import UnitsSelectionInput from "./UnitsSelectionInput";
import {
  calculateTotalCalories,
  editFood,
  getFood,
  insertFood,
} from "../../lib/Food";
import SuccessFailureMessage from "../Success-FailureMessage";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../Loading";

function EditFoodBox({
  id,
  handleClose = () => {},
  setInputErrors = () => {},
  setInputSuccess = () => {},
  setErrorMessage = () => {},
  setSuccessMessage = () => {},
}) {
  const [food, setFood] = useState();
  const [protein, setProtein] = useState();
  const [carb, setCarb] = useState();
  const [fat, setFat] = useState();
  const [servingSize, setServingSize] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    if (id !== undefined) {
      getFood(id)
        .then((data) => {
          if (data === undefined) {
            handleClose();
            return;
          }
          setFood(data);
          setProtein(data.protein);
          setCarb(data.carbs);
          setFat(data.fat);
          setServingSize(data.serving_size);
          setName(data.name);
        })
        .catch((err) => {
          console.log(err);
          setInputErrors(true);
          setErrorMessage("Error updating food");
          handleClose();
          return;
        });
    } else {
      handleClose();
      return;
    }
  }, []);

  if (food === undefined) {
    return <Loading></Loading>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    editFood(id, name, servingSize, fat, carb, protein)
      .then(() => {
        setInputErrors(false);
        setInputSuccess(true);
        setSuccessMessage("Successfully updated food");
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        setInputErrors(true);
        setInputSuccess(false);
        setErrorMessage("Error updating food");
        handleClose();
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();

    editFood(id, name, servingSize, fat, carb, protein, false)
      .then(() => {
        setInputErrors(false);
        setInputSuccess(true);
        setSuccessMessage("Successfully deleted food");
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        setInputErrors(true);
        setInputSuccess(false);
        setErrorMessage("Error deleting food");
        handleClose();
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
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
          inputProps={{ maxLength: 40 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          type="text"
          label="Food Name"
          variant="filled"
          InputProps={{
            disableUnderline: true,
          }}
        ></TextField>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
        }}
      >
        <UnitsSelectionInput
          sx={{
            width: "100%",
          }}
          value={servingSize}
          setValue={setServingSize}
          name="Serving Size"
        ></UnitsSelectionInput>
      </Box>
      <Box
        sx={{
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
          value={protein}
          setValue={setProtein}
        ></MacroTextInput>
      </Box>
      <Box
        sx={{
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
          value={carb}
          setValue={setCarb}
        ></MacroTextInput>
      </Box>
      <Box
        sx={{
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
          value={fat}
          setValue={setFat}
        ></MacroTextInput>
      </Box>
      <Box
        sx={{
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
          value={calculateTotalCalories(fat, carb, protein)}
          variant="filled"
          InputProps={{
            disableUnderline: true,
            readOnly: true,
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: "5%",
        }}
      >
        <Box
          width="40%"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            marginRight: "10%",
          }}
        >
          <Button
            variant="contained"
            onClick={(e) => handleDelete(e)}
            sx={{ width: "75%", bgcolor: "secondary.main" }}
          >
            Delete Food
          </Button>
        </Box>
        <Box
          width="50%"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
          }}
        >
          <Button
            variant="contained"
            onClick={(e) => handleClose()}
            sx={{ width: "30%", bgcolor: "primary.light" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{ marginLeft: "2.5%", width: "60%" }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default EditFoodBox;
