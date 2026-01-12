import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

/**
 * useAuth
 * -------
 * Convenience hook for consuming AuthContext.
 *
 * Responsibilities:
 * - Read AuthContext
 * - Ensure it is used inside AuthProvider
 *
 * It does NOT:
 * - Contain business logic
 * - Modify authentication state
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
