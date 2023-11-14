import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./Router.jsx";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="1083937656173-bn3jdo40uoa2dit0ein0313c78mu5lsj.apps.googleusercontent.com">
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
