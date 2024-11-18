import styles from "./Li-Post.module.scss";
import { useEffect, useState } from "react";
import { TextareaAutosize } from "@mui/base";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { SECTION } from "../../constants/constants";
import StepperComponent from "./../Stepper/Stepper";

const LinkedInPost2 = ({ sectionSelected, sendDataToParent }) => {
  const [about, setAbout] = useState(
    `Excited to share that I recently joined Tech Company as a Software Engineer! Looking forward to making a difference and learning along the way. Excited to share that I recently joined Tech Company as a Software Engineer! Looking forward to making a difference and learning along the way. Excited to share that I recently joined Tech Company as a Software Engineer! Looking forward to making a difference and Lorem`
  );
  const [body, setBody] = useState(
    `Ipsum dolor sit amet consectetur adipisicing elit. Corrupti ipsam dignissimos repellendus optio, maxime nesciunt quidem a facere possimus voluptas distinctio praesentium facilis perferendis modi magnam eveniet, ad quaerat dolorum? Ipsum dolor sit amet consectetur adipisicing elit. Corrupti ipsam dignissimos repellendus optio, maxime nesciunt quidem a facere possimus voluptas distinctio praesentium facilis perferendis modi magnam eveniet, ad quaerat dolorum? Ipsum dolor sit amet consectetur adipisicing elit. Corrupti ipsam dignissimos repellendus optio, maxime nesciunt quidem a facere possimus voluptas distinctio praesentium facilis perferendis modi magnam eveniet, ad quaerat dolorum? Ipsum dolor sit amet consectetur adipisicing elit. Corrupti ipsam dignissimos repellendus optio, maxime nesciunt quidem a facere possimus voluptas distinctio praesentium facilis perferendis modi magnam eveniet, ad quaerat dolorum? nesciunt quidem a facere possimus voluptas distinctio praesentium facilis perferendis modi magnam eveniet, ad quaerat dolorum? Ipsum dolor sit amet consectetur adipisicing elit. Corrupti ipsam dignissimos repellendus optio, maxime nesciunt quidem a facere possimus voluptas distinctio praesentium facilis perferendis modi magnam eveniet, ad quaerat dolorum?`
  );

  const handleSaveAndClose = () => {
    sendDataToParent(SECTION.NONE);
  };

  return (
    <>
      <div className={styles.blur}></div>
      <div
        className={`${
          sectionSelected === SECTION.NONE ? styles.boxShadow : styles.border
        } ${styles.linkedinPost} `}
      >
        <div className={styles.postHeader}>
          <img
            src="https://via.placeholder.com/50"
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

        <div className={styles.postContent}>
          <div className={styles.textSection}>
            {sectionSelected === "01" ? (
              <>
                <TextareaAutosize
                  id="outlined-adornment-password"
                  onChange={(e) => setAbout(e.target.value)}
                  className={styles.scaleUp}
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
              </>
            ) : (
              <p>{about} </p>
            )}
            {sectionSelected === "02" ? (
              <div className={styles.scaleUp}>
                <StepperComponent tepperComponent></StepperComponent>
              </div>
            ) : (
              <p>{body}</p>
            )}
          </div>
          <img
            src="https://via.placeholder.com/400x200"
            alt="Post content"
            className={styles.postImage}
          />
        </div>

        <div className={styles.postFooter}>
          <button className={styles.postAction}>Like</button>
          <button className={styles.postAction}>Comment</button>
          <button className={styles.postAction}>Share</button>
        </div>
      </div>
    </>
  );
};

export default LinkedInPost2;
