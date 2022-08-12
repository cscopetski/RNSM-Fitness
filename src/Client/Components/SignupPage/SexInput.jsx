import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

function SexInput({ setGender = () => {}, currSex = "male" }) {
  const [sex, setSex] = useState(currSex || "");

  const handleChange = (e) => {
    setSex(e.target.value);
    setGender(e.target.value);
  };

  return (
    <FormControl>
      <RadioGroup
        name="gender"
        id="gender"
        required
        aria-labelledby="gender-radio-buttons-label"
        value={sex}
        onChange={handleChange}
      >
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
      </RadioGroup>
    </FormControl>
  );
}

export default SexInput;
