import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Typography, TextField } from "@mui/material/";
import Button from "@mui/material/Button";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import DateInput from "./DateInput";

function PersonalInfoBox({
  setGender = () => {},
  setDOB = () => {},
  setError = () => {},
  currSex = "male",
  currBirthday = "",
}) {
  const [date, setDate] = useState(currBirthday);
  const [sex, setSex] = useState(currSex);
  const handleGender = (e) => {
    setGender(e.target.value);
  };

  useEffect(() => {
    if (!date || date === "") {
      setError(true);
    } else {
      setError(false);
    }
  });

  useEffect(() => {
    setGender("male");
  }, []);

  const handleDOB = (date) => {
    setDate(date);
    setDOB(date);
  };

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
      <Typography variant="h5" sx={{ marginTop: "25px", marginBottom: "25px" }}>
        Select your sex:
      </Typography>
      <FormControl>
        <RadioGroup
          name="gender"
          id="gender"
          required
          aria-labelledby="gender-radio-buttons-label"
          defaultValue={currSex}
          onChange={handleGender}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>
      <Typography variant="h5" sx={{ marginTop: "25px", marginBottom: "25px" }}>
        When were you born?
      </Typography>
      <DateInput currBirthday={currBirthday} setDOB={handleDOB}></DateInput>
      <FormControl></FormControl>
    </Box>
  );
}

export default PersonalInfoBox;
