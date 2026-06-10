import "./Header.scss";
import Logo from "../../assets/Logo/InStock-Logo.svg";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Has class name - header section header__logo header__buttons-container header__button-font
 * @returns Header component for Instock
 */
function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header section">
      <Link to='/'>
        <div className="header__logo">
          <img src={Logo} alt="logo" className="header__logo" />
        </div>
      </Link>
      {isAuthenticated && (
        <div className="header__buttons-container">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "header__buttons header__button-active"
                : "header__buttons"
            }
          >
            <p className="header__button-font">Warehouses</p>
          </NavLink>
          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              isActive
                ? "header__buttons header__button-active"
                : "header__buttons"
            }
          >
            <p className="header__button-font">Inventory</p>
          </NavLink>
        </div>
      )}
      {isAuthenticated && (
        <div className="header__user">
          <span className="header__user-name">{user?.name} ({user?.role})</span>
          <button className="header__logout" onClick={handleLogout}>Logout</button>
        </div>
      )}
      {!isAuthenticated && (
        <div className="header__auth">
          <Link to="/login" className="header__auth-link">Login</Link>
        </div>
      )}
    </header>
  );
}

export default Header;
