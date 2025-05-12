import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#66d8ad", // Your primary color
      contrastText: "#0b2e1d", // Text color on primary
    },
    secondary: {
      main: "#ffa500", // Your secondary color
      contrastText: "#2b2b2b", // Text color on secondary
    },
  },
});

export default theme;
