import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

function DateInput({ setDOB = () => {}, currBirthday = "" }) {
  const [date, setDate] = useState(currBirthday || "");

  const handleChange = (e) => {
    setDate(e.target.value);
    setDOB(e.target.value);
  };

  return (
    <TextField
      required
      type="date"
      name="dob"
      id="dob"
      value={date}
      label="Birthday"
      variant="filled"
      InputLabelProps={{ shrink: true }}
      InputProps={{ disableUnderline: true }}
      onChange={handleChange}
    />
  );
}

export default DateInput;
