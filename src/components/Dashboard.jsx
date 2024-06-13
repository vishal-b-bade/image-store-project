import React, { useEffect, useState } from "react";
import { emailVerify, getCurrentUser, logoutUser } from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { createDocument, createFile, documentsList } from "../appwrite/config";
import { ImageCard, Navbar, ImageForm } from "./index";

const Dashboard = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [imageId, setImageId] = useState([]);

  useEffect(() => {
    isLogin();
  }, []);

  const isLogin = async () => {
    try {
      const user = await getCurrentUser();
      // console.log(user);
      if (typeof user !== "undefined") {
        currentUser(user);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const currentUser = async (user) => {
    try {
      if (user.emailVerification === false) {
        emailVerify();
        alert("Plzz, verifiy email, check your mail.");
        handleLogout();
      } else {
        setName(user.name);
        setEmail(user.email);

        if (user) {
          documents(user.email);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const documents = async (email) => {
    try {
      const list = await documentsList(email);
      // console.log(list);
      setImageId(list.documents);
    } catch (error) {
      console.log(error);
    }
  };

  const userLogout = async () => {
    try {
      const user = logoutUser();
      if (user) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    if (image) {
      // console.log(image);
      // console.log(email);

      const file = await createFile(image);
      // console.log(file);
      const imageId = file.$id;

      if (file) {
        const document = await createDocument({ email, imageId });
        // console.log(document);

        if (document) {
          const list = await documentsList(email);
          // console.log(list);
          setImageId(list.documents);
        }
      }
    } else {
      console.log("Error :: Image can't upload");
    }
  };

  const handleLogout = () => {
    // Add logout logic here
    userLogout();
  };

  return (
    <div className="dashboard">
      {/* <Navbar name={name} handleLogout={handleLogout} /> */}
      <Navbar name={name} handleLogout={handleLogout} fileId={imageId} />

      <ImageForm uploadImage={uploadImage} setImage={setImage} />

      <div className="image-gallery">
        {imageId?.map((image) => (
          <ImageCard key={image.$id} image={image} isLogin={isLogin} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
