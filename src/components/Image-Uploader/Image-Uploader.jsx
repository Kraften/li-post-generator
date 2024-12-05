import React, { useState } from "react";
import html2canvas from "html2canvas";
import styles from "./Image-Uploader.module.scss";
import chatStore from "../../store/chatStore";
import { SECTION, STEPS } from "../../constants/constants.js";

const ImageUploaderWithLogo = () => {
  const [image2, setImage] = useState(null);
  const [logo, setLogo] = useState(null);
  const [logoPosition, setLogoPosition] = useState({ top: 50, left: 50 });
  const updateImage = chatStore((state) => state.updateImage);
  const updateSelectedState = chatStore((state) => state.updateSelectedState);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateImage(URL.createObjectURL(file));
      setImage(URL.createObjectURL(file));
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleDrag = (e) => {
    const parent = e.target.parentNode.getBoundingClientRect();
    const x = Math.min(
      Math.max(0, e.clientX - parent.left),
      parent.width - e.target.offsetWidth
    );
    const y = Math.min(
      Math.max(0, e.clientY - parent.top),
      parent.height - e.target.offsetHeight
    );
    setLogoPosition({ top: y, left: x });
  };

  const saveImage = () => {
    const element = document.getElementById("output-container");
    html2canvas(element, { useCORS: true, scale: 2 }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "combined-image.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };
  const handleCloseStepper = () => {
    updateSelectedState(SECTION.NONE);
  };
  return (
    <div className={styles.containerz}>
      <div className={`${styles.headerWrapper} flexRow`}>
        <h2 className={styles.header}>Upload Image and Add Logo</h2>
        <span className={styles.x} onClick={handleCloseStepper}>
          X
        </span>
      </div>
      <div>
        <label className={styles.fileInput}>
          Upload Background Image:
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
        <br />
        <label className={styles.fileInput}>
          Upload Logo:
          <input type="file" accept="image/*" onChange={handleLogoUpload} />
        </label>
      </div>
      {image2 && (
        <div id="output-container" className={styles.outputContainer}>
          <img src={image2} alt="Uploaded" className={styles.uploadedImage} />
          {logo && (
            <img
              src={logo}
              alt="Logo"
              draggable
              onDragEnd={handleDrag}
              style={{ top: 420, left: 450 }}
              className={styles.logoImage}
            />
          )}
        </div>
      )}
      {image2 && (
        <button onClick={saveImage} className={styles.saveButton}>
          Save Image
        </button>
      )}
    </div>
  );
};

export default ImageUploaderWithLogo;
