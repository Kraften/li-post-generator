import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import styles from "./Image-Uploader.module.scss";
import chatStore from "../../store/chatStore";
import { SECTION } from "../../constants/constants.js";
import sigmaBlackLogo from "/SC-logo_BLACK.png";
import sigmaWhiteLogo from "/SC-logo_WHITE.png";
import sigmaEngBlackLogo from "/190425_Engineering_by_SC_tag_BLACK.png";
import sigmaEngWhiteLogo from "/190425_Engineering_by_SC_tag_WHITE.png";
import { DndContext } from "@dnd-kit/core";
import DraggableLogo from "./Draggable-Logo/Draggable-Logo";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const logos = {
  sigmaLogo: {
    black: sigmaBlackLogo,
    white: sigmaWhiteLogo,
  },
  sigmaEngLogo: {
    black: sigmaEngBlackLogo,
    white: sigmaEngWhiteLogo,
  },
};

const ImageUploaderWithLogo = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [logoPosition, setLogoPosition] = useState({ top: 0, left: 0 });
  const updateImage = chatStore((state) => state.updateImage);
  const updateSelectedState = chatStore((state) => state.updateSelectedState);
  const [selectedLogo, setSelectedLogo] = useState("sigmaLogo");
  const [isLogoBlack, setIsLogoBlack] = useState(true);

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

  const handleFeedbackChange = () => {
    setIsLogoBlack((prevCheck) => !prevCheck);
  };

  return (
    <div className={styles.imageUploadComponent}>
      <div className={`${styles.headerWrapper} flexRow`}></div>
      <div>
        <label className={styles.fileInput}>
          Upload Background Image:
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
      </div>
      <div className={styles.logoControls}>
        <div className={styles.logoPicker}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography>Black</Typography>
            <Switch onChange={handleFeedbackChange} />
            <Typography>White</Typography>
          </Stack>

          <img
            onClick={() => setSelectedLogo("sigmaLogo")}
            width={"100px"}
            className={styles.uploadedImage}
            src={sigmaBlackLogo}
            alt="Background"
          />

          <img
            onClick={() => setSelectedLogo("sigmaEngLogo")}
            width={"100px"}
            className={styles.uploadedImage}
            src={sigmaEngBlackLogo}
            alt="Background"
          />
        </div>
      </div>
      {uploadedImage && (
        <>
          <DndContext onDragEnd={handleDragEnd}>
            <div id="output-container" className={styles.outputContainer}>
              <img
                className={styles.uploadedImage}
                src={uploadedImage}
                alt="Background"
              />
              <div className={styles.absolute}>
                <DraggableLogo
                  logo={logos[selectedLogo][isLogoBlack ? "black" : "white"]}
                  position={logoPosition}
                  setPosition={setLogoPosition}
                />
              </div>
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
