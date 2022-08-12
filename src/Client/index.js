
import React from "react";
import App from "./App";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

const container = document.getElementById("root")
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);