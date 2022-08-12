import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { PageLoadingMinHeight } from "../lib/Loading";

const NotFound = () => {
  return (
    <>
      <Container sx={{
        minHeight: PageLoadingMinHeight
      }}>
        <CssBaseline />
        <Typography variant="h1">404</Typography>
        <Typography variant="h1">The requested page does not exist</Typography>
      </Container>
    </>
  );
};

export default NotFound;
