import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#99e6c8",
      main: "#66d8ad",
      dark: "#33987c",
      contrastText: "#0b2e1d",
    },
    secondary: {
      light: "#ffbd33",
      main: "#ffa500",
      dark: "#cc8400",
      contrastText: "#2b2b2b",
    },
    tertiary: {
      light: "#ffaf66",
      main: "#ff8403",
      dark: "#cc6a02",
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
            backgroundColor: theme.palette.tertiary.dark,
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
            borderColor: theme.palette.tertiary.dark,
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
