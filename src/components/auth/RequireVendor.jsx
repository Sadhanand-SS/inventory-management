import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireVendor = ({children}) => {
    const {user} = useAuth();
    return user?.role === "vendor" ? children : <Navigate to="/unauthorized" />
}

export default RequireVendor;