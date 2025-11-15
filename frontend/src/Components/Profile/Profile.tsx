import { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const getStoredUser = () => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
    }
    // default (in case of error or missing data)
    return { name: "", email: "" };
  };

  const [userDetail, setUserDetail] = useState(getStoredUser());

  //TODO
  //edit user details
  //change password

  const handleUpdateUser = async () => {
    const { name, email } = userDetail;
    if (!name || !email) {
      alert("Please add correct details");
      return false;
    }
    const API = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API}/updateuser/${userDetail._id}`,
      {
        method: "put",
        body: JSON.stringify(userDetail),
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("token") || ""),
        },
      }
    );
    const result = await response.json();
    // console.log("result", result);
    if ("error" in result) {
      alert(result.error);
    } else {
      localStorage.setItem("user", JSON.stringify(userDetail));
      //   navigate("/");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-div">
        <h1>Your details</h1>
        <div className="user-detail">
          <span>Name :</span>
          <input
            placeholder="Enter Name"
            value={userDetail.name}
            onChange={(e) => {
              setUserDetail({
                ...userDetail,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div className="user-detail">
          <span>Email :</span>
          <input
            placeholder="Enter email"
            value={userDetail.email}
            onChange={(e) => {
              setUserDetail({
                ...userDetail,
                email: e.target.value,
              });
            }}
          />
        </div>
        <button onClick={handleUpdateUser}>Edit Details</button>
      </div>
    </div>
  );
  //   return (
  //     <div className='profile-container'>
  //         <div className='profile-div'>
  //             <h1>Your details</h1>
  //             <div className="user-detail"><span>Name :</span><span>{userDetail.name}</span></div>
  //             <div className="user-detail"><span>Email :</span><span>{userDetail.email}</span></div>
  //             <button>Edit Details</button>

  //         </div>
  //     </div>
  //   )
};

export default Profile;
