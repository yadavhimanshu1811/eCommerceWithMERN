import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  const isAuthenticated = localStorage.getItem("user"); // or use your auth state
  return isAuthenticated ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateComponent;
