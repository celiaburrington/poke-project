import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";
import App from "./App";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
