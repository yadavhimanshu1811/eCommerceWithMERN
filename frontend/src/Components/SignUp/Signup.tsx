import { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitdetails = () =>{
    const {name, email, password} = userDetails;
    console.log(name, email, password);
  }

  return (
    <div>
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
  );
};

export default Signup;
