import { useEffect, useState } from "react";
import { TextareaAutosize } from "@mui/base";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { SECTION } from "../constants/constants";

import styles from "./New.module.scss";
import ImageUploaderWithLogo from "./Image-Uploader/Image-Uploader";
import StepperComponent from "./Stepper/Stepper";
import chatStore from "./../store/chatStore";

const New = () => {
  const selectedState = chatStore((state) => state.selectedState);
  const updateSelectedState = chatStore((state) => state.updateSelectedState);
  const breadTextList = chatStore((state) => state.breadTextList);
  const image = chatStore((state) => state.image);

  const [about, setAbout] = useState(
    `Excited to share that I recently joined Tech Company as a Software Engineer! Looking forward to making a difference and learning along the way. Excited to share that I recently joined Tech Company as a Software Engineer! Looking forward to making a difference and learning along the way. Excited to share that I recently joined Tech Company as a Software Engineer! Looking forward to making a difference and Lorem`
  );

  const [body, setBody] = useState(
    `Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique obcaecati, delectus magnam a expedita quasi tempora? Quidem ipsum exercitationem temporibus modi! Omnis in fugit ratione. Impedit optio doloremque quaerat? Eaque adipisci tenetur, distinctio perspiciatis libero ullam consequuntur sint laboriosam eos eum, natus asperiores officia fugit quod beatae ipsum laborum delectus similique rerum inventore mollitia! Qui amet, deleniti ad dignissimos sit unde repudiandae nemo architecto consequatur error, illo laborum officia illum repellendus rerum? Voluptas est et saepe, exercitationem ullam quisquam itaque sunt ipsum magni quo hic dolorum facilis? Quia commodi, quae voluptatem neque fugit, praesentium quas pariatur cupiditate tempore temporibus aliquam.`
  );

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

  useEffect(() => {
    setBody(breadTextList);
    console.log(selectedState);
  }, [breadTextList]);

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
              <p onClick={handleAboutClick}>{about}</p>
              <p onClick={handleBodyClick}>{body}</p>
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
          {/* <div className={`${styles.postHeader}`}>
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
              <p onClick={handleAboutClick}>{about}</p>

              {selectedState === SECTION.FIRST ? (
                <div>
                  <TextareaAutosize
                    id="outlined-adornment-password"
                    onChange={(e) => setAbout(e.target.value)}
                    className={`${styles.scaleUp} ${styles.textInput}`}
                    value={about}
                  ></TextareaAutosize>
                  <div
                    className={`${styles.aboutButtonWrapper}  ${styles.fadeIn}`}
                  >
                    <IconButton
                      className={styles.saveButton}
                      size="large"
                      onClick={handleSaveAndClose}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  </div>
                </div>
              ) : null}
              {selectedState === SECTION.SECOND ? (
                <div className={styles.scaleUp}>
                  <div>
                    <StepperComponent></StepperComponent>
                  </div>
                </div>
              ) : null}
              <p onClick={handleBodyClick}>{body}</p>
            </div>
            {selectedState === SECTION.THIRD ? (
              <div className={styles.scaleUp}>
                <ImageUploaderWithLogo></ImageUploaderWithLogo>
              </div>
            ) : null}
            {image ? (
              <div onClick={handleImageClick} className={styles.imageContainer}>
                <img className={styles.postImage} src={image} width={700}></img>
              </div>
            ) : (
              <div
                onClick={handleImageClick}
                className={`${styles.imageContainer} flexCenter`}
              >
                Image here
              </div>
            )}
          </div>
          <div className={styles.postFooter}>
            <button className={styles.postAction}>Like</button>
            <button className={styles.postAction}>Comment</button>
            <button className={styles.postAction}>Share</button>
          </div> */}
        </div>
        {selectedState !== SECTION.NONE ? (
          <div className={styles.absolute}></div>
        ) : null}
        {selectedState === SECTION.FIRST ? (
          <div className={styles.moda}>
            <div className={styles.aboutTextContainer}>
              <div className={styles.textareaContainer}>
                <TextareaAutosize
                  id="outlined-adornment-password"
                  onChange={(e) => setAbout(e.target.value)}
                  className={`${styles.scaleUp} ${styles.textInput}`}
                  value={about}
                ></TextareaAutosize>
                <IconButton
                  className={`${styles.textareaButton} ${styles.fadeInButton}`}
                  onClick={handleSaveAndClose}
                >
                  <CheckCircleIcon />
                </IconButton>
              </div>
            </div>
          </div>
        ) : null}
        {selectedState === SECTION.SECOND ? (
          <div className={styles.moda}>
            <div className={styles.stepperContainer}>
              <div className={styles.scaleUp}>
                <StepperComponent></StepperComponent>
              </div>
            </div>
          </div>
        ) : null}
        {selectedState === SECTION.THIRD ? (
          <div className={styles.moda}>
            <div className={styles.imagePickerContainer}>
              <div className={styles.scaleUp}>
                <ImageUploaderWithLogo></ImageUploaderWithLogo>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default New;
