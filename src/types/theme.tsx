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
          backgroundColor: theme.palette.tertiary.main,
          color: theme.palette.tertiary.contrastText,
          "&:hover": {
            backgroundColor:
              theme.palette.tertiary.dark || theme.palette.tertiary.main,
          },
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.tertiary.light,
          color: theme.palette.tertiary.contrastText,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.tertiary.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor:
              theme.palette.tertiary.dark || theme.palette.tertiary.main,
          },
        }),
        notchedOutline: ({ theme }) => ({
          borderColor: theme.palette.tertiary.main,
        }),
        input: ({ theme }) => ({
          color: theme.palette.tertiary.contrastText,
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.tertiary.contrastText,
          "&.Mui-focused": {
            color: theme.palette.tertiary.main,
          },
        }),
      },
    },
  },
});

export default theme;
