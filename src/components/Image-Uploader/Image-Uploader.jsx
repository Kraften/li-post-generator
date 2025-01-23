import { useState } from "react";
import html2canvas from "html2canvas";
import styles from "./Image-Uploader.module.scss";
import postStore from "../../store/postStore.js";
import { SECTION } from "../../constants/constants.js";

import { DndContext } from "@dnd-kit/core";
import DraggableLogo from "./Draggable-Logo/Draggable-Logo";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import placeholderImage from "/placeholder.svg";
import ImageControlsMenu, {
  LOGOS,
} from "./Image-Controls-Menu/Image-Controls-menu.jsx";
import userStore from "../../store/userStore.js";

const ImageUploaderComponent = () => {
  const [logoPosition, setLogoPosition] = useState({ top: 0, left: 0 });
  const [selectedLogo, setSelectedLogo] = useState("sigmaEngLogo");
  const [logoColor, setLogoColor] = useState(true);
  const { image, updateEditedImage } = postStore();
  const { updateSelectedStep } = userStore();

  const saveImageToState = () => {
    const element = document.getElementById("output-container");
    html2canvas(element, { useCORS: true, scale: 2 }).then((canvas) => {
      const dataURL = canvas.toDataURL("image/png");
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
