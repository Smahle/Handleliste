import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#66d8ad",
      contrastText: "#0b2e1d",
    },
    secondary: {
      main: "#ffa500",
      contrastText: "#2b2b2b",
    },
    // 👇 Add your custom tertiary color here
    tertiary: {
      main: "#ff8403",
      contrastText: "#2b2b2b",
    },
  },
});

export default theme;
