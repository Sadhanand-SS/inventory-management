import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import InventoryPage from "./pages/InventoryPage";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./components/auth/RequireAuth";
import VendorsPage from "./pages/VendorsPage";
import VendorDetailPage from "./pages/VendorDetailPage";

/**
 * App.jsx
 * -------
 * Application behavior root.
 *
 * Responsibilities:
 * - Define routing
 * - Apply top-level layout
 * - Decide which page renders for a given URL
 *
 * It must NOT:
 * - Mount global providers
 * - Contain business logic
 * - Contain stateful application data
 *
 * This component assumes the application
 * environment is already prepared by `main.jsx`.
 */
const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route
            path="/inventory"
            element={
              <RequireAuth>
                <InventoryPage />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          {/* Default / fallback route */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/vendors"
            element={
              <RequireAuth>
                <VendorsPage />
              </RequireAuth>
            }
          />

          <Route
            path="/vendors/:vendorId"
            element={
              <RequireAuth>
                <VendorDetailPage />
              </RequireAuth>
            }
          />

          {/* <Route path="*" element={<Navigate to="Hello" />} /> */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
