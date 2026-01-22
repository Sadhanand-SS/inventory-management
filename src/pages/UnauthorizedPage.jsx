import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Unauthorized</h1>
      <p>You do not have permission to access this page.</p>

      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default UnauthorizedPage;
