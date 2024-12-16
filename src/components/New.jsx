import { useEffect, useState } from "react";
import { Modal, TextareaAutosize } from "@mui/base";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styles from "./New.module.scss";
import { SECTION } from "../constants/constants";

import ImageUploaderWithLogo from "./Image-Uploader/Image-Uploader";
import StepperComponent from "./Stepper/Stepper";
import chatStore from "./../store/chatStore";
import NumberedSelector from "./Numbered-Selector/Numbered-selector";
import ModalComponent from "./Modal/Modal";

const New = () => {
  const selectedState = chatStore((state) => state.selectedState);
  const updateSelectedState = chatStore((state) => state.updateSelectedState);
  const breadTextList = chatStore((state) => state.breadTextList);
  const image = chatStore((state) => state.image);

  const section = [
    { sectionNumber: "01", title: "Intro Text", isNumberLeft: true },
    { sectionNumber: "02", title: "Main Text", isNumberLeft: false },
    { sectionNumber: "03", title: "Picture", isNumberLeft: true },
  ];

  const [about, setAbout] = useState(
    `Excited to share that I recently joined Tech Company as a Software Engineer! Looking forward to making a difference and learning along the way. Excited to share that I recently joined Tech Company as a Software Engineer! Looking forward to making a difference and learning along the way. Excited to share that I recently joined Tech Company as a Software Engineer! Looking forward to making a difference and Lorem`
  );

  const [body, setBody] = useState();

  const handleSaveAndClose = () => {
    updateSelectedState(SECTION.NONE);
  };

  const handleAboutClick = () => {
    console.log("About");
    updateSelectedState(SECTION.FIRST);
  };

  const handleBodyClick = () => {
    console.log("Body");
    updateSelectedState(SECTION.SECOND);
  };

  const handleImageClick = () => {
    console.log("Image");
    updateSelectedState(SECTION.THIRD);
  };

  const handleSelectionFromChild = (section) => {
    updateSelectedState(section);
  };

  const renderModalContent = () => {
    switch (selectedState) {
      case SECTION.FIRST:
        return (
          <ModalComponent scale={true} title={"Intro Text"}>
            <TextareaAutosize
              id="outlined-adornment-password"
              onChange={(e) => setAbout(e.target.value)}
              className={styles.textInput}
              value={about}
            />
          </ModalComponent>
        );
      case SECTION.SECOND:
        return (
          <ModalComponent scale={true}>
            <StepperComponent />
          </ModalComponent>
        );
      case SECTION.THIRD:
        return (
          <ModalComponent scale={true} title={"Picture"}>
            <ImageUploaderWithLogo />
          </ModalComponent>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.relative}>
        <div
          className={`${styles.linkedinPost} ${
            selectedState === SECTION.NONE ? styles.boxShadow : styles.border
          } boxShadowRevel`}
        >
          <div className={`${styles.postHeader}`}>
            <img
              src="/sce_logo.jpg"
              alt="Profile"
              className={styles.profilePicture}
            />
            <div className={styles.userInfo}>
              <h4 className={styles.userName}>John Doe</h4>
              <p className={styles.userTitle}>
                Software Engineer at Sigma Connectivity Engineering
              </p>
              <span className={styles.postTime}>2h ago</span>
            </div>
          </div>

          <div className={`${styles.postContent}`}>
            <div className={styles.textSection}>
              <div className={`${styles.annotation} ${styles.annotation01}`}>
                <NumberedSelector
                  selectSection={handleSelectionFromChild}
                  section={section[0]}
                ></NumberedSelector>
              </div>
              <div className={`${styles.annotation} ${styles.annotation02}`}>
                <NumberedSelector
                  selectSection={handleSelectionFromChild}
                  section={{
                    sectionNumber: "02",
                    title: "Main Text",
                    isNumberLeft: false,
                  }}
                ></NumberedSelector>
              </div>
              <div className={`${styles.annotation} ${styles.annotation03}`}>
                <NumberedSelector
                  selectSection={handleSelectionFromChild}
                  section={{
                    sectionNumber: "03",
                    title: "Picture",
                    isNumberLeft: true,
                  }}
                ></NumberedSelector>
              </div>
              <p onClick={handleAboutClick}>{about}</p>
              <p onClick={handleBodyClick}>{breadTextList}</p>
            </div>
            {image ? (
              <div onClick={handleImageClick} className={styles.imageContainer}>
                <img className={styles.postImage} src={image} width={700}></img>
              </div>
            ) : (
              <div
                onClick={handleImageClick}
                className={`${styles.noImage} flexCenter`}
              >
                Image here
              </div>
            )}
          </div>
          <div className={styles.postFooter}>
            <button className={styles.postAction}>Like</button>
            <button className={styles.postAction}>Comment</button>
            <button className={styles.postAction}>Share</button>
          </div>
          {selectedState !== SECTION.NONE ? (
            <div className={styles.absolute}></div>
          ) : null}
          {renderModalContent()}
        </div>
      </div>
    </div>
  );
};

export default New;
