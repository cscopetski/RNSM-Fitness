import { createTheme } from "@mui/material";

const primaryColor = "rgb(23, 23, 23)";

export const DarkTheme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#fff",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "filled" && {
            backgroundColor: primaryColor,
            color: "#fff",
            borderRadius: 4,
          }),
        }),
      },
      variants: [
        {
          props: { variant: "filled" },
          style: {
            color: "#fff",
          },
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#fff",
          fill: "#fff",
        },
      },

      variants: [
        {
          props: { variant: "food" },
          style: {
            color: "#fff",
            fill: "#fff",
            "&:hover": {
              color: "#3b3b3b",
              fill: "#3b3b3b",
            },
          },
        },
      ],
    },
    MuiListItem: {
      variants: [
        {
          props: { variant: "food" },
          style: {
            backgroundColor: primaryColor,
            marginTop: "0.5%",
            marginBottom: "0.5%",
            borderRadius: "4px",
          },
        },
      ],
    },
  },
  select: {},
  palette: {
    type: "dark",
    primary: {
      main: primaryColor,
      light: "#3b3b3b",
    },
    secondary: {
      main: "#8C0303",
    },
    background: {
      default: "#292727",
      paper: "#4E4E4E",
      //#232323
      darkPaper: "#232323",
    },
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
    }
  },
});
