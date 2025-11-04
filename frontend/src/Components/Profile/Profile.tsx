import "./Profile.css"

const Profile = () => {
    const userDetails = localStorage.getItem("user");
    const {name, email} = JSON.parse(userDetails || " ");
  return (
    <div className='profile-container'>
        <div className='profile-div'>
            <h1>Your details</h1>
            <div><span>Name:</span>{name}</div>
            <div><span>Email:</span>{email}</div>
            {/* <button>Edit Details</button> TODO */}

        </div>
    </div>
  )
}

export default Profile