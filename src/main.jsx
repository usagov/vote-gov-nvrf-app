import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import "@trussworks/react-uswds/lib/uswds.css";
import "@trussworks/react-uswds/lib/index.css";

window.dataLayer = window.dataLayer || [];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // default stale time for every query (in milliseconds)
      staleTime: 600000, // 10 minutes in milliseconds
      cacheTime: 600000, // how long should it stay in the local cache
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
