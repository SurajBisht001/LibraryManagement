import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BooksProvider } from "./context/BooksContext";
import App from "./App";
import theme from "./pages/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <BooksProvider>
         <App />
      </BooksProvider>
      </BrowserRouter>
      </ThemeProvider>
      </React.StrictMode>
);