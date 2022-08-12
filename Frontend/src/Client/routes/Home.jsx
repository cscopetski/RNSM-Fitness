import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React from "react";
import { PageLoadingMinHeight } from "../lib/Loading";

const Home = () => {
  return (
    <div>
      <main>
        <div>
          <Container maxWidth="sm" sx={{
            minHeight: PageLoadingMinHeight
          }}>
            <Typography variant="h2" align="center" gutterBottom>
              RNSM Fitness
            </Typography>

            <Typography variant="h5" align="center" gutterBottom>
              RNSM.Fit is a nutritional and fitness web application programmed and designed over the summer of 2022. It allows you to track your daily calories, aswell as your daily macronutrient intake.
            </Typography>

            <Typography variant="h5" align="center" gutterBottom>
              Create and customize your own foods, track your weight gains, and achieve your set nutritonal goals!
            </Typography>
          </Container>
        </div>
      </main>

    </div>
  );
};

export default Home;
