import React from "react";
import { InputAdornment, TextField } from "@mui/material";

const MacroTextInput = ({
  name = "",
  value = "",
  readOnly,
  setValue = () => { },
}) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <TextField
      sx={{
        width: "100%",
      }}
      inputProps={{
        min: 0,
      }}
      required={!readOnly}
      type="number"
      label={name}
      variant="filled"
      value={value}
      onChange={(e) => handleChange(e)}
      InputProps={{
        disableUnderline: true,
        endAdornment: <InputAdornment position="end">g</InputAdornment>,
        readOnly: readOnly,
      }}
    />
  );
};

export default MacroTextInput;
