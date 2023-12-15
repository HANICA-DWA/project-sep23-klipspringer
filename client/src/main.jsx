import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./Router.jsx";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./redux/store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GG_APP_ID}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
        <Router />
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
