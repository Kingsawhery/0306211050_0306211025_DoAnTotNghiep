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
            src="https://shopdunk.com/images/thumbs/0012445_Logo_ShopDunk.png"
            alt="Admin Logo"
          />
        </div>
        <div className="admin-actions">
          <FontAwesomeIcon icon={faBell} className="admin-icon" title="Thông báo" />
          <FontAwesomeIcon icon={faUser} className="admin-icon" title="Tài khoản" />
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
