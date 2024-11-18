import styles from "./Button-Row-Contents.module.scss";
import { PropTypes } from "prop-types";
import IconButton from "@mui/material/IconButton";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { STEPS } from "../../../constants/constants";

const ButtonRowContents = ({
  activeStep,
  handleSendHobbyQuestion,
  handleSendPerksQuestion,
}) => {
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
            color="green"
            className={styles.nextButton}
            size="large"
            onClick={handleSendPerksQuestion}
            disableRipple
          >
            <ArrowCircleRightIcon />
          </IconButton>
        );
      case STEPS.CONFIRM:
        break;
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
