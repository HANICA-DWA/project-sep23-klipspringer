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
        main: "#000000"
      }
    },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "35px"
        }
      }
    }
  }
});

theme = responsiveFontSizes(theme, { factor: 3.5 });

export default theme;
