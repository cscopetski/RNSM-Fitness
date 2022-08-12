import React from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function SectionBox({ name, currentFigure, units }) {
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
      {currentFigure === undefined ? (
        <Typography variant="h6">---</Typography>
      ) : (
        <Typography variant="h6">{currentFigure}</Typography>
      )}
    </Box>
  );
}

export default SectionBox;
