import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import "./Signup.css";

interface SignupSuccess {
  user: {
    name: string;
    email: string;
  };
  auth: string;
}

interface SignupFailure {
  error: string;
}

const Signup = () => {
  const { showNotification } = useNotification();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("user");
    if (isAuthenticated) {
      navigate("/");
    }
  });

  const submitdetails = async () => {
    const { name, email, password } = userDetails;
    if (!name || !email || !password) {
      showNotification("Please enter appropriate entries!", "error");
    } else {
      const API = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API}/register`, {
        method: "post",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result: SignupSuccess | SignupFailure = await response.json();

      if ("user" in result) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/");
      } else {
        showNotification(result.error, "error");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-div">
        <h1>Sign up</h1>
        <input
          className="input-box"
          placeholder="Enter Name"
          value={userDetails.name}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              name: e.target.value,
            })
          }
        />
        <input
          className="input-box"
          placeholder="Enter Email"
          value={userDetails.email}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              email: e.target.value,
            })
          }
        />
        <input
          className="input-box"
          placeholder="Enter Password"
          value={userDetails.password}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              password: e.target.value,
            })
          }
        />
        <button onClick={submitdetails}>Sign up</button>
      </div>
    </div>
  );
};

export default Signup;
