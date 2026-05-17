import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HomePage } from "./routes/index";
import "./styles.css";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("Missing #root mount element");
}

createRoot(rootEl).render(
  <StrictMode>
    <HomePage />
  </StrictMode>,
);
