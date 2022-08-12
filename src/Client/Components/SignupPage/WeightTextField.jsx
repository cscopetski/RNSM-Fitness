import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { InputAdornment, TextField, Typography } from "@mui/material";

export function toKg(weight) {
  let kg = weight / 2.20462262185;
  return kg;
}

export function toLbs(weight) {
  let lbs = parseFloat(weight * 2.20462262185).toFixed(1);
  return lbs;
}

function WeightTextField({
  units = "imperial",
  setWeight = () => {},
  setError = () => {},
  currWeight = "",
}) {
  const minWeightkg = 0;
  const minWeightlbs = 0;
  const maxWeightkg = 453.592;
  const maxWeightlbs = 1000;

  const [weight, setWeightForm] = useState("");
  const [weightMetric, setWeightMetricForm] = useState("");

  useEffect(() => {
    if (currWeight !== "") {
      handleWeightKgs(currWeight);
    }
  }, []);

  const handleWeight = (e) => {
    if (e.target.value === "") {
      setWeightForm(e.target.value);
      setError(true);
      return;
    }
    setError(false);
    const value = +e.target.value;

    const min = 0;
    const max = units === "imperial" ? maxWeightlbs : maxWeightkg;
    const setter = units === "imperial" ? handleWeightLbs : handleWeightKgs;

    if (value < min) {
      setter(min);
    } else if (value > max) {
      setter(max);
    } else {
      setter(value);
    }
  };

  const handleWeightLbs = (input) => {
    let weight = parseFloat(toKg(input)).toFixed(2);
    setWeight(weight);
    setWeightMetricForm(weight);
    setWeightForm(input);
  };

  const handleWeightKgs = (input) => {
    let weight = parseFloat(parseFloat(input).toFixed(2));
    setWeight(weight);
    setWeightMetricForm(weight);
    setWeightForm(toLbs(weight));
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignText: "center",
      }}
    >
      {units === "imperial" ? (
        <TextField
          sx={{ width: "100%" }}
          required
          inputProps={{
            min: minWeightlbs,
            max: maxWeightlbs,
          }}
          margin="normal"
          name="weight"
          id="weight"
          type="number"
          label="Weight"
          variant="filled"
          value={weight}
          onChange={handleWeight}
          InputProps={{
            disableUnderline: true,
            endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
          }}
        />
      ) : (
        <TextField
          sx={{ width: "100%" }}
          required
          inputProps={{
            min: minWeightkg,
            max: maxWeightkg,
          }}
          margin="normal"
          name="weight"
          id="weight"
          type="number"
          label="Weight"
          variant="filled"
          value={weightMetric}
          onChange={handleWeight}
          InputProps={{
            disableUnderline: true,
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
        />
      )}
    </Box>
  );
}

export default WeightTextField;
