import Box from "@mui/material/Box";
import { Slider, Typography } from "@mui/material";
import React from "react";

function PercentSlider({ currPercent = 0, setPercent = () => { } }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <Slider
        value={currPercent}
        onChange={(e) => setPercent(e)}
        step={0.05}
        marks
        min={0.0}
        max={1.0}
        sx={{ maxWidth: "75%" }}
      />
      <Typography gutterBottom sx={{ marginLeft: "10%", maxWidth: "25%" }}>
        {Math.round(currPercent * 100) + "%"}
      </Typography>
    </Box>
  );
}

export default PercentSlider;
