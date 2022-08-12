import * as React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export function CircularProgressWithLabel({
  title = "",
  value = 0,
  size = 150,
  displayValue = "",
  displayGoal = "",
}) {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        size={size}
        value={100}
        sx={{
          color: "primary.light",
          position: "absolute",
        }}
      />
      <CircularProgress
        variant="determinate"
        value={value <= 100 ? value : 100}
        size={size}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5">{displayValue}g</Typography>
        <Typography variant="subtitle">/{displayGoal}</Typography>
        <Typography variant="caption" style={{ fontWeight: 800 }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
}
