import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  typography: {
    fontFamily: "Inter",
    fontSize: 12,
  },
  palette: {
    primary: {
      main: "#FFA501",
    },
    secondary: {
      main: "#238892",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "35px",
          textTransform: "lowercase"
        }
      },
    },
  },
});

theme = responsiveFontSizes(theme, { factor: 3.5 });

export default theme;
