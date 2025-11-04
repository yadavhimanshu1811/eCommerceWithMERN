import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
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
      alert("Please enter appropriate entries"); //TODO handle error for each input
    } else {
      let result = await fetch("http://localhost:3000/register", {
        method: "post",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();

      localStorage.setItem("user", JSON.stringify(result));

      console.log(result);
      navigate("/");
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
