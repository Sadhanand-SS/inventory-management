import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import ThemeProvider from "./contexts/ThemeContext";
import InventoryProvider from "./contexts/InventoryContext";
import AuthProvider from "./contexts/AuthContext.jsx";
import VendorProvider from "./contexts/VendorContext.jsx";

/**
 * main.jsx
 * --------
 * Application bootstrap file.
 *
 * Responsibilities:
 * - Create React root
 * - Mount global providers that must persist
 *   for the entire lifetime of the app
 *
 * Global providers belong here because they:
 * - define the application environment
 * - must NOT be remounted during routing changes
 *
 * Providers mounted here:
 * - ThemeProvider      → UI environment
 * - InventoryProvider → application data
 *
 * NOTE:
 * AuthProvider will be added here in the next step.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <VendorProvider>
          <InventoryProvider>
            <App />
          </InventoryProvider>
        </VendorProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
