import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function GoalBox({ name, currentFigure, goalFigure, units }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">
        {name} {units || ""}
      </Typography>
      <Typography variant="h6">
        {currentFigure}/{goalFigure}
      </Typography>
    </Box>
  );
}

export default GoalBox;
