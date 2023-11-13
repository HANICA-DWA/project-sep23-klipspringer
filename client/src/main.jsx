import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./Router.jsx";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </React.StrictMode>
);
