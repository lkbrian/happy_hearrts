import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/lato";
import "@fontsource/lato/400-italic.css";
import "@fontsource/lato/400.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import theme from "./theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
