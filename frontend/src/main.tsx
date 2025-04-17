import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router";

import App from "./App.tsx";
import { ErrorBoundary } from "./routes/components/index.ts";
import { routesSection } from "./routes/sections.tsx";

const router = createBrowserRouter([
  {
    Component: () => (
      <App>
        <Outlet />
      </App>
    ),
    errorElement: <ErrorBoundary />,
    children: routesSection,
  },
]);

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
