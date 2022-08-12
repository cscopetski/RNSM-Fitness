import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Navigate } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import FoodBox from "../../Components/FoodPage/CreateFoodBox";
import ViewFoods from "../../Components/FoodPage/FoodList";
import FoodList from "../../Components/FoodPage/FoodList";
import { getAllUserFoods } from "../../lib/Food";
import React, { useState, useEffect } from "react";
import { PageLoadingMinHeight } from "../../lib/Loading";

const Food = ({ token }) => {
  return (
    <div>
      {!token && <Navigate to="/account/login" />}
      <main>
        <div>
          <Container
            maxWidth="lg"
            sx={{
              minHeight: PageLoadingMinHeight,
            }}
          >
            <Box sx={{ marginTop: 10, width: "100%" }}>
              <FoodList token={token} inDialog={true}></FoodList>
            </Box>
          </Container>
        </div>
      </main>
    </div>
  );
};

export default Food;
