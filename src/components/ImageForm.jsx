import React from "react";

const ImageForm = ({ uploadImage, setImage }) => {
  return (
    <div>
      <form id="image-upload-form" onSubmit={uploadImage}>
        <input
          type="file"
          name="file"
          id="image-input"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          autoComplete="false"
        />
        <label htmlFor="image-input" className="upload-btn">
          Select Image
        </label>
        <button type="submit" className="submit-btn">
          Upload
        </button>
      </form>
    </div>
  );
};

export default ImageForm;
