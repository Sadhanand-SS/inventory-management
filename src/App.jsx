import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./components/auth/RequireAuth";
import VendorsPage from "./pages/VendorsPage";
import VendorDetailPage from "./pages/VendorDetailPage";
import RequireAdmin from "./components/auth/RequireAdmin";
import RequireVendor from "./components/auth/RequireVendor";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import VendorInventoryPage from "./pages/inventory/VendorInventoryPage";
import VendorSummary from "./components/vendor/VendorSummary";
import AdminVendorInventoryPage from "./pages/inventory/AdminVendorInventoryPage";
import VendorSettings from "./components/vendor/VendorSettings";
import ProductPage from "./pages/ProductPage";
import ProductOverview from "./components/inventory/ProductOverview";
import ProductSettings from "./components/inventory/ProductSettings";

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
            path="/inventory/:vendorId"
            element={
              <RequireAuth>
                <VendorInventoryPage />
              </RequireAuth>
            }
          />
          <Route
            path="/inventory/:vendorId/:productId"
            element={
              <RequireAuth>
                <RequireVendor>
                  <ProductPage />
                </RequireVendor>
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<ProductOverview />} />
            <Route path="settings" element={<ProductSettings />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          {/* Default / fallback route */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/vendors"
            element={
              <RequireAuth>
                <RequireAdmin>
                  <VendorsPage />
                </RequireAdmin>
              </RequireAuth>
            }
          />

          <Route
            path="/vendors/:vendorId"
            element={
              <RequireAuth>
                <RequireAdmin>
                  <VendorDetailPage />
                </RequireAdmin>
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<VendorSummary />} />
            <Route path="inventory" element={<AdminVendorInventoryPage />} />
            <Route path="settings" element={<VendorSettings />} />
          </Route>
          <Route
            path="/vendors/:vendorId/inventory/:productId"
            element={
              <RequireAuth>
                <RequireAdmin>
                  <ProductPage />
                </RequireAdmin>
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<ProductOverview />} />
            <Route path="settings" element={<ProductSettings />} />
          </Route>
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
