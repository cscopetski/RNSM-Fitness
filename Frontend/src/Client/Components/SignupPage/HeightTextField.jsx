import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { InputAdornment, TextField } from "@mui/material";

function HeightTextField({
  units = "imperial",
  setHeight = () => { },
  setError = () => { },
  currHeight = "",
}) {
  const minHeightFt = 0;
  const maxHeightFt = 7;
  const minHeightIn = 0;
  const maxHeightIn = 11;
  const maxHeightCm = 242;
  const minHeightCm = 0;
  const min = 0;
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [heightCm, setHeightCm] = useState("");

  useEffect(() => {
    if (currHeight !== "") {
      handleHeightMetric(currHeight);
    }
  }, []);

  const setFt = (e) => {
    if (e.target.value === "") {
      setHeightFt(e.target.value);
      setError(true);
      return;
    }
    setError(false);
    handleHeightImp(e.target.value, heightIn);
  };

  const setIn = (e) => {
    if (e.target.value === "") {
      setHeightIn(e.target.value);
      setError(true);
      return;
    }
    setError(false);
    handleHeightImp(heightFt, e.target.value);
  };

  const setCm = (e) => {
    if (e.target.value === "") {
      setHeightCm(e.target.value);
      setError(true);
      return;
    }
    setError(false);
    handleHeightMetric(e.target.value);
  };

  const handleHeightImp = (heightFt, heightIn) => {
    let height = toCm(heightFt, heightIn);
    if (height >= maxHeightCm) {
      height = maxHeightCm;
      setHeightFt(maxHeightFt);
      setHeightIn(maxHeightIn);
    } else if (height <= minHeightCm) {
      height = minHeightCm;
      setHeightFt(minHeightFt);
      setHeightIn(minHeightIn);
    } else {
      setHeightFt(heightFt);
      setHeightIn(heightIn);
    }
    setHeightCm(height);
    setHeight(height);
  };

  const handleHeightMetric = (input) => {
    if (isNaN(parseFloat(input))) {
      input = 0;
    }
    let height = parseFloat(parseFloat(input).toFixed(2));
    if (height >= maxHeightCm) {
      input = maxHeightCm;
      setHeightCm(maxHeightCm);
    } else if (height <= minHeightCm) {
      input = minHeightCm;
      setHeightCm(minHeightCm);
    } else {
      setHeightCm(height);
      setHeight(height);
    }
    let ftin = toFtandIn(input);
    setHeightFt(ftin[0]);
    setHeightIn(ftin[1]);
    setHeight(height);
  };

  const toCm = (feet, inches) => {
    if (isNaN(feet)) {
      feet = 0;
    }
    if (isNaN(inches)) {
      inches = 0;
    }

    let cm = parseFloat((feet * 30.48 + inches * 2.54).toFixed(2));
    return cm;
  };

  const toFtandIn = (cm) => {
    let feet = 0;
    let inches = 0;
    if (isNaN(cm)) {
      return [feet, inches];
    }
    let realFeet = cm / 30.48;
    feet = Math.floor(realFeet);
    inches = Math.floor((realFeet - feet) * 12);
    return [feet, inches];
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
        <div
          sx={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <TextField
            inputProps={{
              min: minHeightFt,
              max: maxHeightFt,
            }}
            sx={{ marginRight: "5%", width: "47.5%" }}
            required
            margin="normal"
            name="height (ft)"
            id="height (ft)"
            type="number"
            label="Height"
            variant="filled"
            value={heightFt}
            onChange={setFt}
            InputProps={{
              disableUnderline: true,
              endAdornment: <InputAdornment position="end">ft</InputAdornment>,
            }}
          />
          <TextField
            required
            sx={{ width: "47.5%" }}
            inputProps={{
              min: minHeightIn,
              max: maxHeightIn,
            }}
            margin="normal"
            name="Height (in)"
            id="Height (in)"
            type="number"
            label="Height"
            variant="filled"
            value={heightIn}
            onChange={setIn}
            InputProps={{
              disableUnderline: true,
              endAdornment: <InputAdornment position="end">in</InputAdornment>,
            }}
          />
        </div>
      ) : (
        <TextField
          required
          sx={{ width: "50%" }}
          inputProps={{
            min: minHeightCm,
            max: maxHeightCm,
          }}
          margin="normal"
          name="height (cm)"
          id="height (cm)"
          type="number"
          label="Height"
          variant="filled"
          value={heightCm}
          onChange={setCm}
          InputProps={{
            disableUnderline: true,
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
        />
      )}
    </Box>
  );
}

export default HeightTextField;
