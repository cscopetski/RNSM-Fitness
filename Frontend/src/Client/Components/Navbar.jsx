import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import NavbarButton from "./NavbarButton";
import { Outlet } from "react-router-dom";

function Navbar({ token }) {
  if (token === undefined) {
    return (
      <div>
        <AppBar position="relative" sx={{ boxShadow: 4 }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box
                component="img"
                sx={{ alignContent: "left", width: 100, marginRight: 5 }}
                alt="logo"
                src={require("../Images/RNSM_Logo_White_Toolbar.png")}
              />

              <Box sx={{ flexGrow: 1 }}>
                <NavbarButton navTo="/" buttonText="Home" />
              </Box>

              <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
                <NavbarButton navTo="/user/login" buttonText="login" />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Outlet />
      </div>
    );
  }

  return (
    <div>
      <AppBar position="relative" sx={{ boxShadow: 4 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              component="img"
              sx={{ alignContent: "left", width: 100, marginRight: 5 }}
              alt="logo"
              src={require("../Images/RNSM_Logo_White_Toolbar.png")}
            />

            <Box sx={{ flexGrow: 1 }}>
              <NavbarButton navTo="/" buttonText="My Home" />

              <NavbarButton navTo="/food" buttonText="Food" />

              <NavbarButton
                navTo={"/profile/" + token}
                buttonText="My Profile"
              />
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
              <NavbarButton navTo="/account/settings" buttonText="Settings" />

              <NavbarButton navTo="/account/logout" buttonText="Logout" />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </div>
  );
}

export default Navbar;
