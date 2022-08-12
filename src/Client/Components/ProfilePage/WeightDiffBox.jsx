import React from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { toLbs } from "../SignupPage/WeightTextField";

function WeightDiffBox({
  name,
  currentWeight,
  initialWeight,
  label,
  units = "imperial",
}) {
  const weightDiff =
    units === "imperial"
      ? toLbs(currentWeight - initialWeight)
      : Math.round(10 * (currentWeight - initialWeight)) / 10;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">
        {name} {label || ""}
      </Typography>
      {weightDiff === undefined ? (
        <Typography variant="h6">---</Typography>
      ) : (
        <Typography variant="h6">
          {(weightDiff >= 0 ? "+" : "") + weightDiff}
        </Typography>
      )}
    </Box>
  );
}

export default WeightDiffBox;
