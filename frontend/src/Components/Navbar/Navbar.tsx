import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
// import eCart from "../../assets/eCart.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/signup");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="nav-header">
        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      <ul className={`nav-ul ${menuOpen ? "open" : ""}`}>
        {auth ? (
          <>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active-link" : "non-active"
                }
                onClick={() => setMenuOpen(false)}
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
                onClick={() => setMenuOpen(false)}
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
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className={({ isActive }) =>
                  isActive ? "active-link" : "non-active"
                }
              >
                Logout
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? "active-link" : "non-active"
                }
                onClick={() => setMenuOpen(false)}
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
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;