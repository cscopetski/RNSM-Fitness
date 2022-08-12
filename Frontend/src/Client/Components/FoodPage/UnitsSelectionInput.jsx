import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";

const UnitsSelectionInput = ({
  name = "",
  value = "",
  readOnly = false,
  setValue = () => { },
}) => {
  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
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
        onChange={(e) => handleValueChange(e)}
        InputProps={{
          disableUnderline: true,
          endAdornment: <InputAdornment position="end">g</InputAdornment>,
          readOnly: readOnly,
        }}
      />
    </Box>
  );
};

export default UnitsSelectionInput;
