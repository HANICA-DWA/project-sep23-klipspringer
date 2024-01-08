import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  typography: {
    fontFamily: "Inter",
    fontSize: 12,
  },
  palette: {
    primary: {
      main: "#238892",
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "35px",
          textTransform: "none"
        }
      },
    },
  },
});

theme = responsiveFontSizes(theme, { factor: 3.5 });

export default theme;
