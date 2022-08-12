import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  FormControl,
  FormControlLabel,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  InputAdornment,
  OutlinedInput,
  Radio,
  RadioGroup,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { ConstructionOutlined } from "@mui/icons-material";
import HeightTextField from "./HeightTextField";
import WeightTextField from "./WeightTextField";
import UnitsButton from "./UnitsButton";

function HealthInfoBox({
  setHeight,
  setWeight,
  setSignupError,
  setGoalWeight,
  setProfileUnits,
}) {
  const [units, setUnits] = useState("imperial");

  const [heightError, setHeightError] = useState(true);
  const [weightError, setWeightError] = useState(true);
  const [goalWeightError, setGoalWeightError] = useState(true);

  const handleUnits = (e) => {
    if (e.target.value !== units) {
      setUnits(e.target.value);
    }
    setProfileUnits(e.target.value);
  };

  useEffect(() => {
    setSignupError(heightError || weightError || goalWeightError);
  });

  return (
    <Box
      sx={{
        marginTop: "5%",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignText: "center",
        marginBottom: "10%",
      }}
    >
      <Typography variant="h5">Measurements</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignText: "center",
          width: "50%",
        }}
      >
        <HeightTextField
          units={units}
          setHeight={setHeight}
          setError={setHeightError}
        ></HeightTextField>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignText: "center",
          width: "25%",
        }}
      >
        <WeightTextField
          units={units}
          setWeight={setWeight}
          setError={setWeightError}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignText: "center",
          width: "25%",
        }}
      >
        <Typography variant="h6" sx={{ marginTop: "10%" }}>
          Goal Weight
        </Typography>
        <WeightTextField
          units={units}
          setWeight={setGoalWeight}
          setError={setGoalWeightError}
        ></WeightTextField>
      </Box>
      <Box sx={{ marginTop: "5%" }}>
        <UnitsButton setParentUnits={setUnits}></UnitsButton>
      </Box>
    </Box>
  );
}

export default HealthInfoBox;

/*
required
          margin="normal"
          name="firstname"
          id="firstname"
          label="First name"
          variant="filled"
          InputProps={{ disableUnderline: true }}
*/
