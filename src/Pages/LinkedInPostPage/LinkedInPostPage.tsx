import React from "react";
import JSZip from "jszip";
import styles from "./LinkedInPostPage.module.scss";
import { SECTION, EDIT_SECTION } from "../../constants/constants";
import ImageUploaderComponent from "../../components/Image-Uploader/Image-Uploader";
import postStore from "../../store/postStore";
import StepperComponent from "../../components/Stepper/Stepper";
import userStore from "../../store/userStore";
import NumberedSelector from "../../components/Numbered-Selector/Numbered-selector";
import ModalComponent from "../../components/Modal/Modal";
import EditTextComponent from "../../components/Edit-Text/Edit-Text";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { capitalizeFirstLetter } from "./../../utils/utils";
import placeholderImage from "/placeholder.svg";
import iconSendImage from "/PS_Icon_Send.svg";
import { Section, User, PostStore, UserStore } from "../../models/types";

const LinkedInPostPage: React.FC = () => {
  const {
    editedImage,
    image,
    mainText,
    introText,
    isHelpOverlayOpen,
    updateIsHelpOverlayOpen,
  } = postStore() as PostStore;

  const {
    user,
    selectedStep,
    updateSelectedStep,
    selectedEditSection,
    updateSelectedEditSection,
  } = userStore() as UserStore;

  const SECTIONS: Section[] = [
    { sectionNumber: "01", title: "Text", isNumberLeft: true },
    { sectionNumber: "02", title: "Picture", isNumberLeft: false },
  ];

  const handleAboutClick = (): void => {
    updateSelectedEditSection(EDIT_SECTION.INTRO_TEXT);
  };

  const handleBodyClick = (): void => {
    updateSelectedEditSection(EDIT_SECTION.MAIN_TEXT);
  };

  const handleImageClick = (): void => {
    updateSelectedEditSection(EDIT_SECTION.IMAGE);
  };

  const handleSelectionFromChild = (section: string): void => {
    updateSelectedStep(section);
  };

  const handleCloseModal = (): void => {
    updateIsHelpOverlayOpen(false);
  };

  const handleDownload = async (): Promise<void> => {
    if (!editedImage && !image) {
      alert("Please upload an image first!");
      return;
    }

    try {
      const zip = new JSZip();

      // Optimize images before adding to zip
      const optimizeImage = async (dataUrl: string): Promise<string> => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            if (!ctx) {
              throw new Error("Could not get canvas context");
            }

            // Set dimensions
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw with high-quality settings
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, 0, 0);

            // Convert to optimized format
            const optimizedDataUrl = canvas.toDataURL("image/jpeg", 0.9);
            resolve(optimizedDataUrl.split(",")[1]);
          };
          img.src = dataUrl;
        });
      };

      // Optimize both images
      const [optimizedEditedImage, optimizedOriginalImage] = await Promise.all([
        editedImage ? optimizeImage(editedImage) : Promise.resolve(""),
        image ? optimizeImage(image) : Promise.resolve(""),
      ]);

      // Add optimized images to zip
      zip.file("image-with-logo.jpg", optimizedEditedImage, { base64: true });
      zip.file("image-without-logo.jpg", optimizedOriginalImage, {
        base64: true,
      });

      // Add text content
      const textContent = `${introText}\n\n${mainText}`;
      zip.file("post.txt", textContent);

      // Generate zip with compression
      const content = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: {
          level: 9,
        },
      });

      // Create download link
      const folderName = `${user.firstName}_${user.lastName}_post`;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(content);
      a.download = `${folderName}.zip`;
      a.click();

      // Clean up
      URL.revokeObjectURL(a.href);
    } catch (error) {
      console.error("Error during download:", error);
      alert(
        "An error occurred while preparing the download. Please try again."
      );
    }
  };

  const renderModalContent = (): JSX.Element | null => {
    switch (selectedStep) {
      case SECTION.FIRST:
        return (
          <ModalComponent
            scale={true}
            titleCenter={true}
            title={"Personal Information"}
            helpText={
              "Enter the desired data, make a few choices and you will generate a personal text about yourself."
            }
          >
            <StepperComponent />
          </ModalComponent>
        );

      case SECTION.SECOND:
        return (
          <ModalComponent
            scale={true}
            titleCenter={true}
            title={"Picture"}
            helpText={
              "Choose a picture that you would like to use for your LinkedIn post. You can also choose which logo to use and where to position it."
            }
          >
            <ImageUploaderComponent />
          </ModalComponent>
        );
      default:
        return null;
    }
  };

  const renderModalEditContent = (): JSX.Element | null => {
    switch (selectedEditSection) {
      case EDIT_SECTION.INTRO_TEXT:
        return (
          <ModalComponent scale={true} title={"Edit Intro Text"}>
            <EditTextComponent
              text={introText}
              section={EDIT_SECTION.INTRO_TEXT}
            />
          </ModalComponent>
        );

      case EDIT_SECTION.MAIN_TEXT:
        return (
          <ModalComponent scale={true} title={"Edit Main Text"}>
            <EditTextComponent
              text={mainText}
              section={EDIT_SECTION.MAIN_TEXT}
            />
          </ModalComponent>
        );
      case EDIT_SECTION.IMAGE:
        return (
          <ModalComponent
            scale={true}
            titleCenter={true}
            title={"Picture"}
            helpText={
              "Choose a picture that you would like to use for your LinkedIn post. You can also choose which logo to use and where to position it."
            }
          >
            <ImageUploaderComponent />
          </ModalComponent>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.wrapper}>
      {isHelpOverlayOpen && (
        <div className={styles.helpContainer}>
          <div className={styles.aaaabsolute}>
            <div className={styles.close}>
              <IconButton size="large" onClick={handleCloseModal} disableRipple>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </div>
      )}
      <div className={styles.relative}>
        <div
          className={`${styles.linkedinPost} ${
            selectedStep === SECTION.NONE &&
            selectedEditSection === EDIT_SECTION.NONE
              ? styles.boxShadow
              : styles.border
          }`}
        >
          <div className={`${styles.postHeader}`}>
            <img
              src="/sce_logo.jpg"
              alt="Profile"
              className={styles.profilePicture}
            />
            <div className={styles.userInfo}>
              <h4 className={styles.userName}>{`${capitalizeFirstLetter(
                user.firstName
              )} ${capitalizeFirstLetter(user.lastName)}`}</h4>
              <p className={styles.userTitle}>
                {`${
                  user.occupation === ""
                    ? "Engineer"
                    : capitalizeFirstLetter(user.occupation)
                } at Sigma Connectivity Engineering`}
              </p>
              <span className={styles.postTime}>Just now</span>
            </div>
          </div>

          <div className={`${styles.postContent}`}>
            <div className={styles.textSection}>
              {SECTIONS.map((section, index) => (
                <div
                  key={index}
                  className={`${styles.annotation} ${
                    styles[`annotation0${index + 1}`]
                  }`}
                >
                  <NumberedSelector
                    selectSection={handleSelectionFromChild}
                    section={section}
                  />
                </div>
              ))}
              <p className="pointer" onClick={handleAboutClick}>
                {introText}
              </p>
              <p className="pointer" onClick={handleBodyClick}>
                {mainText}
              </p>
            </div>
            {editedImage ? (
              <div onClick={handleImageClick} className={styles.imageContainer}>
                <img
                  className={styles.postImage}
                  src={editedImage}
                  width={700}
                  alt="Post"
                />
              </div>
            ) : (
              <img
                src={placeholderImage}
                onClick={handleImageClick}
                className={`${styles.noImage} flexCenter`}
                alt="Placeholder"
              />
            )}
          </div>
          <div className={styles.postFooter}>
            <button className={styles.postAction}>Like</button>
            <button className={styles.postAction}>Comment</button>
            <button className={styles.postAction} onClick={handleDownload}>
              Share
            </button>
          </div>
          {selectedStep !== SECTION.NONE ||
          selectedEditSection !== EDIT_SECTION.NONE ? (
            <div className={styles.absolute}></div>
          ) : null}
          {renderModalContent()}
          {renderModalEditContent()}
        </div>
        <div className={styles.saveButtonContainer}>
          <IconButton
            disabled={!editedImage && !image}
            className={styles.saveButton}
            size="large"
            onClick={handleDownload}
            disableRipple
          >
            <img src={iconSendImage} onClick={handleDownload} alt="Send" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default LinkedInPostPage;
