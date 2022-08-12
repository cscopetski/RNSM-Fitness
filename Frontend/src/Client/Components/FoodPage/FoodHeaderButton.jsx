import React, { useState } from "react";
import { Box, Button } from "@mui/material";

const FoodHeaderButton = ({
  name = "",
  units = "",
  value = "",
  changeSort,
  sort,
}) => {
  const [selected, setSelected] = useState(true);
  const handleChange = () => {
    setSelected(changeSort(value));
  };

  return (
    <Box
      borderTop={3}
      borderBottom={3}
      borderColor={"primary.dark"}
      height={"100%"}
      width={"100%"}
      sx={
        sort === value
          ? {
            borderTopColor: selected ? "primary.dark" : "text.primary",
            borderBottomColor: !selected ? "primary.dark" : "text.primary",
          }
          : {}
      }
    >
      <Button
        disableRipple
        onClick={(e) => handleChange()}
        variant="raised"
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: 0,
        }}
      >
        <Box>{name}</Box>
        <Box>{units}</Box>
      </Button>
    </Box>
  );
};

export default FoodHeaderButton;
