import styles from "./Button-Row-Contents.module.scss";
import { PropTypes } from "prop-types";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { STEPS } from "./../../../constants/constants";
import { SECTION } from "../../../constants/constants";
import userStore from "../../../store/userStore";
import postStore from "../../../store/postStore";

const ButtonRowContents = ({
  isDisabled,
  isLoading,
  activeStep,
  handleSendHobbyQuestion,
  handleSendPerksQuestion,
}) => {
  const { updateSelectedStep } = userStore();
  const { selectedPerksList } = postStore();

  const handleSaveAndClose = () => {
    updateSelectedStep(SECTION.NONE);
  };

  const buttonRowSwitcher = () => {
    switch (activeStep) {
      case STEPS.INFO:
        return (
          <IconButton
            className={styles.button}
            disabled={!isDisabled || isLoading}
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
            disabled={selectedPerksList.length === 0}
            className={styles.button}
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
            className={styles.button}
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
  return <div className={styles.buttonWrapper}>{buttonRowSwitcher()}</div>;
};

export default ButtonRowContents;

ButtonRowContents.propTypes = {
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  activeStep: PropTypes.string,
  handleSendPerksQuestion: PropTypes.func,
  handleSendHobbyQuestion: PropTypes.func,
  selectedPerkItems: PropTypes.array,
};
