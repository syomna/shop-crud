import { createTheme } from "@mui/material";

const primaryColor: string = "#0671a1";
const defaultTheme = createTheme({
  typography: {
    fontFamily: [
      "Montserrat",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    button: {
      textTransform: "none",
    },
  },
});

export { primaryColor, defaultTheme };
