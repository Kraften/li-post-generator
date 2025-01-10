import styles from "./Modal.module.scss";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { PropTypes } from "prop-types";
import userStore from "./../../store/userStore";
import { SECTION } from "../../constants/constants.js";
import { EDIT_SECTION } from "./../../constants/constants";

const ModalComponent = ({ scale, title, children, isClosable }) => {
  const { updateSelectedStep, updateSelectedEditSection } = userStore();

  const handleCloseModal = () => {
    updateSelectedEditSection(EDIT_SECTION.NONE);
    updateSelectedStep(SECTION.NONE);
  };

  return (
    <div className={`${styles.modal} ${scale ? styles.scaleUp : null}`}>
      {isClosable && (
        <div className={styles.close}>
          <IconButton size="large" onClick={handleCloseModal} disableRipple>
            <CloseIcon />
          </IconButton>
        </div>
      )}
      {title === "" ? null : <h2>{title}</h2>}
      {children}
    </div>
  );
};

ModalComponent.propTypes = {
  isClosable: PropTypes.bool,
  scale: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.children,
};

ModalComponent.defaultProps = {
  isClosable: true,
};

export default ModalComponent;
