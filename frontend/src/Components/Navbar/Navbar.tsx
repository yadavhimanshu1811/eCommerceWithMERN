import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import eCart from "../../assets/eCart.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/signup");
  };
  return (
    <div className="navbar">
      <img src={eCart} alt="logo" />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active-link" : "non-active"
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                isActive ? "active-link" : "non-active"
              }
            >
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "active-link" : "non-active"
              }
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={logout}
              to="/login"
              className={({ isActive }) =>
                isActive ? "active-link" : "non-active"
              }
            >
              Logout
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul">
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? "active-link" : "non-active"
              }
            >
              Sign up
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "active-link" : "non-active"
              }
            >
              Login
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
