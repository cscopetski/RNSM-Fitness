import React from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import LoginBox from "./LoginBox";

function Loading(margin = 50, minHeight = "0px") {
  return (
    <Box maxWidth="false" sx={{
      minHeight: minHeight,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      marginTop: margin,
      marginBottom: margin,
    }}>
      <CircularProgress />
    </Box>
  );
}

export default Loading;
