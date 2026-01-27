import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="unauthorized-page-wrapper">
      <div className="unauthorized-card">
        <div className="unauthorized-icon-container">
          {/* You can add an SVG or Icon here via CSS */}
          <div className="warning-icon" aria-hidden="true">
            !
          </div>
        </div>

        <div className="unauthorized-content">
          <h1 className="unauthorized-title">Unauthorized</h1>
          <p className="unauthorized-message">
            You do not have permission to access this page.
          </p>
        </div>

        <div className="unauthorized-actions">
          <Link to="/login" className="btn-return-login">
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
