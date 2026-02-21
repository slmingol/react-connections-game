import React from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App";
import { reportWebVitals, logWebVitals } from "./lib/performance";
import { trackWebVital } from "./lib/analytics";

import "./reset.css";
import "./styles.css";

const root = createRoot(document.querySelector("#root"));
root.render(<App />);

// Report web vitals for performance monitoring
// In development: logs to console
// In production: sends to analytics if configured
reportWebVitals((metric) => {
  logWebVitals(metric);
  trackWebVital(metric);
});
