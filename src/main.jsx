import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ColorModeProvider } from "./context/ThemeContext";
import { LibraryProvider } from "./context/LibraryContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
      <ColorModeProvider>
      <BrowserRouter>
      <LibraryProvider>
         <App />
      </LibraryProvider>
      </BrowserRouter>
      </ColorModeProvider>
      </React.StrictMode>
);