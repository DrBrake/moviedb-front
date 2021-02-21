import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#6200ee",
    },
    secondary: {
      main: "#ffffff",
      dark: "#d3d3d3",
    },
    error: {
      main: "#b00020",
    },
  },
});

export default theme;
