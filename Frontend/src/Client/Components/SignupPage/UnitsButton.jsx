import React, { useState } from "react";
import {
  FormControl,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

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
