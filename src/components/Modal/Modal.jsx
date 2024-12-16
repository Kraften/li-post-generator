import styles from "./Modal.module.scss";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import chatStore from "./../../store/chatStore";
import { SECTION } from "../../constants/constants.js";
import { PropTypes } from "prop-types";

const ModalComponent = ({ scale, title, children }) => {
  const updateSelectedState = chatStore((state) => state.updateSelectedState);

  const handleCloseModal = () => {
    updateSelectedState(SECTION.NONE);
  };

  return (
    <div className={`${styles.moda} ${scale ? styles.scaleUp : null}`}>
      <div className={styles.close}>
        <IconButton size="large" onClick={handleCloseModal} disableRipple>
          <CloseIcon />
        </IconButton>
      </div>
      {title === "" ? null : <h2>{title}</h2>}
      {children}
    </div>
  );
};

ModalComponent.propTypes = {
  scale: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.children,
};

export default ModalComponent;
