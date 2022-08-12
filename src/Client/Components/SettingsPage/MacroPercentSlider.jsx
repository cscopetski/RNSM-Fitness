import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Slider, TextField, Typography } from "@mui/material";
import { maxHeight, maxWidth } from "@mui/system";
import React, { useState } from "react";
import PercentSlider from "./PercentSlider";

function MacroPercentSlider({
  currPercent = 0,
  setPercent = () => { },
  macroGrams = 0,
  title = "",
}) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "left",
      }}
    >
      <Typography>
        {title}: {macroGrams} g
      </Typography>
      <PercentSlider
        currPercent={currPercent}
        setPercent={setPercent}
      ></PercentSlider>
    </Box>
  );
}

export default MacroPercentSlider;
