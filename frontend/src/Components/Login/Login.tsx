import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface LoginSuccess {
  name: string;
  email: string;
  id: any;
}

interface LoginError {
  error: string;
}

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("user");
    if (isAuthenticated) {
      navigate("/");
    }
  });

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const { email, password } = loginDetails;
    if (!email || !password) {
      alert("Please enter appropriate entries");
    } else {
      const response = await fetch("http://localhost:3000/login", {
        method: "post",
        body: JSON.stringify(loginDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result: LoginSuccess | LoginError = await response.json();
      if ("name" in result) {
        //TODO resolve typescript error
        localStorage.setItem("user", JSON.stringify(result));
        navigate("/");
      } else {
        alert(result.error);
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
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
