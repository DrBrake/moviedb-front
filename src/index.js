import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { AppContainer } from "react-hot-loader";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

let routerKey = 0;

const render = (Component) => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <AppContainer key={routerKey}>
        <Component />
      </AppContainer>
    </ThemeProvider>,
    document.getElementById("app")
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./App.js", () => {
    routerKey++;
    render(App);
  });
}
