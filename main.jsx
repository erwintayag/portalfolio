import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Portfolio from "./working-copy.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Portfolio />
  </StrictMode>
);
