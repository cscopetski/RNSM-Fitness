import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, { useState } from "react";
import { MenuItem, Select, TextField } from "@mui/material";

const SelectionBox = ({
  name = "",
  value = 0,
  setValue = () => { },
  selections = [],
}) => {
  const [selection, setSelection] = useState(value);

  const handleChange = (e) => {
    setSelection(e.target.value);
    setValue(e.target.value);
  };

  return (
    <TextField
      value={selection}
      label={name}
      onChange={handleChange}
      select
      variant="filled"
      InputProps={{
        disableUnderline: true,
      }}
    >
      {selections.map((element) => {
        return (
          <MenuItem value={element} key={element}>
            {element}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SelectionBox;
