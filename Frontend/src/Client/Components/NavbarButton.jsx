import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function NavbarButton(props) {
  const location = useLocation();

  return (
    <Link style={{ textDecoration: "none" }} to={props.navTo}>
      <Button
        type="submit"
        disableRipple
        variant="text"
        sx={{
          height: "40px",
          color: "text.primary",
          backgroundColor: "primary.main",
          fontWeight: "bold",
          borderBottom: 3,
          borderRadius: 0,
          borderBottomColor:
            props.navTo === "/"
              ? location.pathname === props.navTo
                ? "text.primary"
                : "primary.main"
              : location.pathname.includes(props.navTo)
                ? "text.primary"
                : "primary.main",
        }}
      >
        {props.buttonText}
      </Button>
    </Link>
  );
}

export default NavbarButton;
