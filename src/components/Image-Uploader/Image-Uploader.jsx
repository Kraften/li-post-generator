import { useState } from "react";
import html2canvas from "html2canvas";
import styles from "./Image-Uploader.module.scss";
import chatStore from "../../store/chatStore";
import { SECTION } from "../../constants/constants.js";
import mainLogo from "/sigma_logo_black.png";
import { DndContext } from "@dnd-kit/core";
import DraggableLogo from "./Draggable-Logo/Draggable-Logo";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ImageUploaderWithLogo = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [logoPosition, setLogoPosition] = useState({ top: 130, left: 700 });
  const updateImage = chatStore((state) => state.updateImage);
  const updateSelectedState = chatStore((state) => state.updateSelectedState);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateImage(URL.createObjectURL(file));
      setUploadedImage(URL.createObjectURL(file));
    }
  };
  const saveImageToState = () => {
    const element = document.getElementById("output-container");
    html2canvas(element, { useCORS: true, scale: 2 }).then((canvas) => {
      const dataURL = canvas.toDataURL("image/png");
      updateImage(dataURL);
    });
    handleCloseModal();
  };

  const handleDragEnd = (event) => {
    const { delta } = event;
    setLogoPosition((prev) => ({
      top: prev.top + delta.y,
      left: prev.left + delta.x,
    }));
  };

  const handleCloseModal = () => {
    updateSelectedState(SECTION.NONE);
  };

  return (
    <div className={styles.containerz}>
      <div className={`${styles.headerWrapper} flexRow`}>
        <h2 className={styles.header}>Upload Image and Add Logo</h2>
        <IconButton
          className={styles.x}
          size="large"
          onClick={handleCloseModal}
          disableRipple
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div>
        <label className={styles.fileInput}>
          Upload Background Image:
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
      </div>

      {uploadedImage && (
        <>
          <span>The logo can be moved around.</span>
          <DndContext onDragEnd={handleDragEnd}>
            <div id="output-container" className={styles.outputContainer}>
              <img
                className={styles.uploadedImage}
                src={uploadedImage}
                alt="Background"
              />
              <DraggableLogo
                logo={mainLogo}
                position={logoPosition}
                setPosition={setLogoPosition}
              />
            </div>
          </DndContext>
        </>
      )}
      {uploadedImage && (
        <div className={styles.buttonRow}>
          <IconButton
            className={styles.saveButton}
            size="large"
            onClick={saveImageToState}
            disableRipple
          >
            <CheckCircleIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default ImageUploaderWithLogo;
