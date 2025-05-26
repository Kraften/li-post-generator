import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import styles from "./Image-Uploader.module.scss";
import postStore from "../../store/postStore.js";
import { SECTION } from "../../constants/constants.js";

import { DndContext } from "@dnd-kit/core";
import DraggableLogo from "./Draggable-Logo/Draggable-Logo";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import placeholderImage from "/placeholder.svg";
import ImageControlsMenu from "./Image-Controls-Menu/Image-Controls-menu";
import userStore from "../../store/userStore.js";
import { LOGOS } from "./../../constants/constants";

const ImageUploaderComponent = () => {
  const [logoPosition, setLogoPosition] = useState({ top: 32, left: 32 });
  const [selectedLogo, setSelectedLogo] = useState("sigmaEngLogo");
  const [logoColor, setLogoColor] = useState(true);
  const { image, updateEditedImage } = postStore();
  const { updateSelectedStep } = userStore();

  useEffect(() => {
    if (image) {
      setLogoPosition({ top: 32, left: 32 });
    }
  }, [image]);

  const saveImageToState = () => {
    const element = document.getElementById("output-container");
    const scale = window.devicePixelRatio || 1; // Use device pixel ratio for better quality on high-DPI displays

    html2canvas(element, {
      useCORS: true,
      scale: scale,
      allowTaint: true,
      backgroundColor: null,
      imageTimeout: 0,
      logging: false,
      onclone: (clonedDoc) => {
        // Ensure all images in the cloned document are loaded
        const images = clonedDoc.getElementsByTagName("img");
        return Promise.all(
          Array.from(images).map((img) => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            });
          })
        );
      },
    }).then((canvas) => {
      // Create a temporary canvas for final optimization
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");

      // Set dimensions (LinkedIn recommended size)
      const maxWidth = 1200;
      const maxHeight = 1200;
      let width = canvas.width;
      let height = canvas.height;

      // Maintain aspect ratio while fitting within max dimensions
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      tempCanvas.width = width;
      tempCanvas.height = height;

      tempCtx.imageSmoothingEnabled = true;
      tempCtx.imageSmoothingQuality = "high";
      tempCtx.drawImage(canvas, 0, 0, width, height);

      const dataURL = tempCanvas.toDataURL("image/jpeg", 0.92);
      updateEditedImage(dataURL);
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
    updateSelectedStep(SECTION.NONE);
  };

  const logoControls = (a) => {
    setSelectedLogo(a.logo);
    setLogoColor(a.color);
    console.log(a);
  };

  return (
    <div className={styles.imageUploadComponent}>
      <ImageControlsMenu
        onLogoChange={(e) => logoControls(e)}
      ></ImageControlsMenu>
      {image ? (
        <DndContext onDragEnd={handleDragEnd}>
          <div id="output-container" className={styles.outputContainer}>
            <img
              className={styles.uploadedImage}
              src={image}
              alt="Background"
            />
            <div className={styles.absolute}>
              <DraggableLogo
                logo={LOGOS[selectedLogo][logoColor]}
                position={logoPosition}
                setPosition={setLogoPosition}
              />
            </div>
          </div>
        </DndContext>
      ) : (
        <div className={styles.outputContainer}>
          <img src={placeholderImage}></img>
        </div>
      )}
      {image && (
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

export default ImageUploaderComponent;
