import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";

ReactDOM.render(
  <React.Fragment>

    <ThemeProvider theme={theme}>
    <CssBaseline />

      <App />
    </ThemeProvider>
    </React.Fragment>,document.getElementById("root")
);
