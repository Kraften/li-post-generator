import styles from "./Modal.module.scss";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { PropTypes } from "prop-types";
import userStore from "./../../store/userStore";
import { SECTION } from "../../constants/constants.js";
import { EDIT_SECTION } from "./../../constants/constants";

const ModalComponent = ({ scale, title, titleCenter, helpText, children }) => {
  const { updateSelectedStep, updateSelectedEditSection } = userStore();

  const handleCloseModal = () => {
    updateSelectedEditSection(EDIT_SECTION.NONE);
    updateSelectedStep(SECTION.NONE);
  };

  return (
    <div className={`${styles.modal} ${scale ? styles.scaleUp : null}`}>
      <div className={styles.close}>
        <IconButton size="large" onClick={handleCloseModal} disableRipple>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={styles.header}>
        {title === "" ? null : (
          <h2 className={titleCenter ? "flexCenter" : ""}>{title}</h2>
        )}
        {helpText && <p className={styles.helpText}>{helpText}</p>}
      </div>
      {children}
    </div>
  );
};

ModalComponent.propTypes = {
  scale: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.children,
  titleCenter: PropTypes.bool,
  helpText: PropTypes.string,
};

export default ModalComponent;
