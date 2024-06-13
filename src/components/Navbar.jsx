import React, { useEffect, useState } from "react";
// import { getFilePreview } from "../appwrite/config";

const Navbar = ({ name, handleLogout, fileId }) => {
  const [profileSrc, setProfileSrc] = useState("/profile.jpeg");

  // const getImage = async () => {
  //   const fileImage = await getFilePreview(fileId);
  //   // console.log(fileImage.href);
  // };

  // useEffect(() => {
  //   getImage();
  // }, []);

  return (
    <div>
      <nav className="navbar">
        <div className="profile-info">
          <img src={profileSrc} alt="Profile" className="profile-pic" />
          <span className="username">{name}</span>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
};

export default Navbar;
