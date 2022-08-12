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

function UnitsButton({ setParentUnits, currUnits = "imperial" }) {
  const [units, setUnits] = useState(currUnits);

  const handleUnits = (e) => {
    if (e.target.value !== units) {
      setUnits(e.target.value);
      if (setParentUnits) {
        setParentUnits(e.target.value);
      }
    }
  };

  return (
    <div>
      <FormControl
        sx={{
          textAlign: "center",
          alignItems: "center",
          mt: 1,
        }}
      >
        <ToggleButtonGroup value={units} exclusive onChange={handleUnits}>
          <ToggleButton
            value="imperial"
            sx={{
              width: "50%",
              color: "text.primary",
              bgcolor: "primary.main",
            }}
          >
            Imperial
          </ToggleButton>
          <ToggleButton
            value="metric"
            sx={{
              width: "50%",
              color: "text.primary",
              bgcolor: "primary.main",
            }}
          >
            Metric
          </ToggleButton>
        </ToggleButtonGroup>
      </FormControl>
    </div>
  );
}

export default UnitsButton;
