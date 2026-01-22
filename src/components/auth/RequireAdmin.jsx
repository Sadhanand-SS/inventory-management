import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAdmin = ({ children }) => {
  const { user } = useAuth();
  return user?.role === "admin" ? (
    children
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export default RequireAdmin;
