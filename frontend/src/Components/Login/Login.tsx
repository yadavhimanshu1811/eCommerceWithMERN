import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import "./Login.css";
import Loader from "../Loader/Loader";

interface LoginSuccess {
  user: { name: string; email: string; id: any };
  auth: string;
}

interface LoginError {
  error: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("user");
    if (isAuthenticated) {
      navigate("/");
    }
  });
  const [loading, setLoading] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const { email, password } = loginDetails;
    if (!email || !password) {
      showNotification("Please enter appropriate entries!", "error");
    } else {
      setLoading(true);
      const API = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API}/login`, {
        method: "post",
        body: JSON.stringify(loginDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result: LoginSuccess | LoginError = await response.json();
      setLoading(false);
      if ("error" in result) {
        showNotification(result.error, "error");
      } else {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        showNotification("User logged in successfully", "success");
        navigate("/");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-div">
        <h1>Login</h1>
        <input
          value={loginDetails.email}
          onChange={(e) => {
            setLoginDetails({
              ...loginDetails,
              email: e.target.value,
            });
          }}
          type="text"
          placeholder="Enter Email"
          className="input-box"
        />
        <input
          value={loginDetails.password}
          onChange={(e) => {
            setLoginDetails({
              ...loginDetails,
              password: e.target.value,
            });
          }}
          type="password"
          placeholder="Enter Password"
          className="input-box"
        />
        {loading ? (
          <Loader size="sm" />
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Login;
