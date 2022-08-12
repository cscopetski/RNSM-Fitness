import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Navigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";

const AccountFeed = ({ token }) => {
  return (
    <div style={{ backgroundColor: "#F8F7FF" }}>
      {/* <Navbar token={token} /> */}

      {/* Doesnt render this page if they are logged in already */}
      {!token && <Navigate to="/account/login" />}

      {/* Imports default styles and looks */}
      <CssBaseline />

      {/* main tag represents dominant content of the body, basically just for organization */}
      <main>
        <div>
          <Container maxWidth="sm">
            {/* MUI Has these built in properties(They also call these components) for their components that handles a lot of things for us. gutterBottom adds margin.
                All of these properties can be seen and listed with explainations on their api documentation.
                Typography API: https://mui.com/material-ui/api/typography/

                These can all be modified aswell to our liking using the sx property and themes:
                https://mui.com/material-ui/customization/how-to-customize/
            */}

            <Typography
              variant="h2"
              align="center"
              gutterBottom
              sx={{ color: "black" }}
            >
              Account Feed
            </Typography>

            <Typography
              variant="h2"
              align="center"
              gutterBottom
              sx={{ color: "black" }}
            >
              Some juicy shit idk, maybe we wont route to an account feed who
              knows yet thuis is just a test lolololool waddup
            </Typography>
          </Container>
        </div>
      </main>
    </div>
  );
};

export default AccountFeed;
