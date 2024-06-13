import React, { useEffect, useState } from "react";
import {
  deleteDocument,
  deleteFile,
  downloadFile,
  getFilePreview,
} from "../appwrite/config";

const ImageCard = ({ image }) => {
  const [imageUrl, setImageUrl] = useState();

  // console.log(image);
  const fileId = image.imageId;
  const documentId = image.$id;

  useEffect(() => {
    if (image) {
      getFilePreview(fileId).then((img) => {
        // console.log(img);
        setImageUrl(img.href);
      });
    }
  }, [image]);

  const deleteImage = async () => {
    try {
      await deleteFile(fileId);
      console.log("Image Deleted...");
      await deleteDocument(documentId);
      console.log("Document Deleted...");
    } catch (error) {
      console.log(error);
    }
  };

  const downlodImage = async () => {
    try {
      const image = await downloadFile(fileId);
      // console.log(image);
      if (image) {
        window.open(image.href);
        console.log("Image Downloaded...");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="image-card">
      <img src={imageUrl} alt="image href error" className="uploaded-image" />
      <div className="image-actions">
        <button onClick={() => deleteImage()}>Delete</button>
        <button id="download-btn" onClick={() => downlodImage()}>
          Download
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
