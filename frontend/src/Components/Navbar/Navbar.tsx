import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () =>{
    localStorage.removeItem("user");
    navigate("/signup");
  }
  return (
    <div className="navbar">
      <ul className="nav-ul">
        <li><Link to="/">Products</Link></li>
        <li><Link to="/signup">Sign up</Link></li>
        <li><Link to="/add">Add Product</Link></li>
        <li><Link to="/update">Update Product</Link></li>
        <li><Link onClick={logout} to="/signup">Logout</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;