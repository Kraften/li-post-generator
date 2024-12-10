import styles from "./Button-Row-Contents.module.scss";
import { PropTypes } from "prop-types";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { STEPS } from "./../../../constants/constants";
import chatStore from "./../../../store/chatStore";
import { SECTION } from "../../../constants/constants";

const ButtonRowContents = ({
  activeStep,
  handleSendHobbyQuestion,
  handleSendPerksQuestion,
}) => {
  const updateSelectedState = chatStore((state) => state.updateSelectedState);

  const handleSaveAndClose = () => {
    updateSelectedState(SECTION.NONE);
  };
  const buttonRowSwitcher = () => {
    switch (activeStep) {
      case STEPS.HOBBY:
        return (
          <IconButton
            className={styles.nextButton}
            size="large"
            onClick={handleSendHobbyQuestion}
            disableRipple
          >
            <ArrowCircleRightIcon />
          </IconButton>
        );

      case STEPS.PERKS:
        return (
          <IconButton
            className={styles.nextButton}
            size="large"
            onClick={handleSendPerksQuestion}
            disableRipple
          >
            <ArrowCircleRightIcon />
          </IconButton>
        );
      case STEPS.CONFIRM:
        return (
          <IconButton
            className={styles.saveButton}
            size="large"
            onClick={handleSaveAndClose}
            disableRipple
          >
            <CheckCircleIcon />
          </IconButton>
        );
      default:
        break;
    }
  };
  return <div className={styles.wrapper}>{buttonRowSwitcher()}</div>;
};

export default ButtonRowContents;

ButtonRowContents.propTypes = {
  activeStep: PropTypes.string,
  handleSendPerksQuestion: PropTypes.func,
  handleSendHobbyQuestion: PropTypes.func,
};
