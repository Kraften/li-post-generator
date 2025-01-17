import styles from "./Button-Row-Contents.module.scss";
import { PropTypes } from "prop-types";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { STEPS } from "./../../../constants/constants";
import { SECTION } from "../../../constants/constants";
import userStore from "../../../store/userStore";

const ButtonRowContents = ({
  isDisabled,
  activeStep,
  handleSendHobbyQuestion,
  handleSendPerksQuestion,
}) => {
  const { updateSelectedStep } = userStore();

  const handleSaveAndClose = () => {
    updateSelectedStep(SECTION.NONE);
  };
  const buttonRowSwitcher = () => {
    switch (activeStep) {
      case STEPS.INFO:
        return (
          <IconButton
            disabled={isDisabled ? true : false}
            className={styles.nextButton}
            size="large"
            onClick={handleSendHobbyQuestion}
            disableRipple
            sx={{
              "&.Mui-disabled": {
                background: "white",
                color: "var(--disabled-grey)",
              },
            }}
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
  isDisabled: PropTypes.bool,
  activeStep: PropTypes.string,
  handleSendPerksQuestion: PropTypes.func,
  handleSendHobbyQuestion: PropTypes.func,
};
