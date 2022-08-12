import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import React from "react";
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
