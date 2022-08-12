import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

function ActivityLevelBox({ setActivityLevel = () => { }, currActivityLevel }) {
  const defaultVal = "0";
  const [activity, setActivity] = useState(currActivityLevel || defaultVal);
  const handleChange = (e) => {
    setActivity(e.target.value);
    setActivityLevel(e.target.value);
  };

  useEffect(() => {
    setActivityLevel(defaultVal);
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
        Activity Level
      </Typography>

      <FormControl sx={{ width: "50%" }}>
        <RadioGroup
          onChange={handleChange}
          aria-labelledby="activity-level-group-label"
          value={activity}
          name="radio-buttons-group"
        >
          <FormControlLabel value={0} control={<Radio />} label="Sedentary" />
          <Typography variant="subtitle2">Little to no exercise</Typography>
          <FormControlLabel
            value={1}
            control={<Radio />}
            label="Lightly Active"
          />
          <Typography variant="subtitle2">Exercise 1-3 times/week</Typography>
          <FormControlLabel value={2} control={<Radio />} label="Active" />
          <Typography variant="subtitle2">Exercise 4-5 times/week</Typography>
          <FormControlLabel value={3} control={<Radio />} label="Very Active" />
          <Typography variant="subtitle2">
            Daily exercise or intense exercise 3-4 times/week
          </Typography>
        </RadioGroup>
      </FormControl>
      <Box
        sx={{
          marginTop: "10%",
          backgroundColor: "primary.main",
          padding: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="subtitle1">
          Exercise: 15-30 minutes of elevated heart rate activity
        </Typography>
        <Typography variant="subtitle1">
          Intense exercise: 45-120 minutes of elevated heart rate activity
        </Typography>
      </Box>
    </Box>
  );
}

export default ActivityLevelBox;
