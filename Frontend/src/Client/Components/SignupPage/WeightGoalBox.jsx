import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

function WeightGoalBox({ setWeightGoal = () => { }, currWeightGoal = "" }) {
  const defaultVal = "0";
  const [goal, setGoal] = useState(currWeightGoal || defaultVal);
  const handleChange = (e) => {
    setGoal(e.target.value);
    setWeightGoal(e.target.value);
  };

  useEffect(() => {
    setWeightGoal(defaultVal);
  }, []);

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
      <Typography variant="h5" sx={{ marginBottom: "25px" }}>
        Weight Goal
      </Typography>

      <FormControl>
        <RadioGroup
          onChange={handleChange}
          aria-labelledby="activity-level-group-label"
          value={goal}
          name="radio-buttons-group"
        >
          <FormControlLabel value={0} control={<Radio />} label="Lose Weight" />
          <FormControlLabel
            value={1}
            control={<Radio />}
            label="Maintain Weight"
          />
          <FormControlLabel value={2} control={<Radio />} label="Gain Weight" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default WeightGoalBox;
