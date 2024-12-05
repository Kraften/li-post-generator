import styles from "./Bread-Text-Step.module.scss";
import { PropTypes } from "prop-types";
import chatStore from "./../../../store/chatStore";

const BreadTextStep = () => {
  const breadTextList = chatStore((state) => state.breadTextList);

  return <div className={styles.text}>{breadTextList}</div>;
};

export default BreadTextStep;

BreadTextStep.propTypes = {
  activeStep: PropTypes.string,
  chatError: PropTypes.string,
  handleQuestionFromChild: PropTypes.func,
  passSelectedPerksToParent: PropTypes.func,
};
