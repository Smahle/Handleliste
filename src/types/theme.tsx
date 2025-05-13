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
    tertiary: {
      main: "#ff8403",
      contrastText: "#2b2b2b",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          // Applies to all Button variants
          backgroundColor: theme.palette.tertiary.main,
          color: theme.palette.tertiary.contrastText,
          "&:hover": {
            backgroundColor:
              theme.palette.tertiary.dark || theme.palette.tertiary.main,
          },
        }),
      },
    },
  },
});

export default theme;
