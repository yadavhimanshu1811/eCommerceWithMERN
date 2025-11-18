import { useState } from "react";
import "./Profile.css";
import { useNotification } from "../../context/NotificationContext";
import Loader from "../Loader/Loader";

const Profile = () => {
  const { showNotification } = useNotification();

  const getStoredUser = () => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      showNotification("Error parsing user from localStorage", "error");
    }
    // default (in case of error or missing data)
    return { name: "", email: "" };
  };

  const [userDetail, setUserDetail] = useState(getStoredUser());
  const [loading, setLoading] = useState(false);

  //TODO
  //edit user details
  //change password

  const handleUpdateUser = async () => {
    const { name, email } = userDetail;
    if (!name || !email) {
      showNotification("Please add correct details", "error");
      return false;
    }
    setLoading(true);
    const API = import.meta.env.VITE_API_URL;
    const response = await fetch(`${API}/updateuser/${userDetail._id}`, {
      method: "put",
      body: JSON.stringify(userDetail),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token") || ""),
      },
    });
    const result = await response.json();
    setLoading(false);
    if ("error" in result) {
      showNotification(result.error, "error");
    } else {
      showNotification("User updated successfully !", "success");
      localStorage.setItem("user", JSON.stringify(userDetail));
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
        {loading ? <Loader size="sm"/> : <button onClick={handleUpdateUser}>Edit Details</button>}
      </div>
    </div>
  );
};

export default Profile;
