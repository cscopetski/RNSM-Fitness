import Container from "@mui/material/Container";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import FoodList from "../../Components/FoodPage/FoodList";
import React from "react";
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
