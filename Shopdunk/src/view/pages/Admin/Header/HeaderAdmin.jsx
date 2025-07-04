import "./HeaderAdmin.scss";
import { faBell, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HeaderAdmin = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <header className="admin-header">
      <div className="admin-container">
        <div className="admin-logo">
          <img
            src={`${process.env.REACT_APP_LOCALHOST_SERVER}/bannerImage/avatar_preview_rev_1.png`}
            alt="Admin Logo"
          />
        </div>
        <div className="admin-actions">
          <FontAwesomeIcon
            icon={faSignOut}
            className="admin-icon"
            title="Đăng xuất"
            onClick={handleLogout}
          />
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
