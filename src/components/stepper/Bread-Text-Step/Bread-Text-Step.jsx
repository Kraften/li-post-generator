import styles from "./Bread-Text-Step.module.scss";
import { PropTypes } from "prop-types";
import chatStore from "./../../../store/chatStore";
import { TextareaAutosize } from "@mui/base";

const BreadTextStep = () => {
  const breadTextList = chatStore((state) => state.breadTextList);
  const updateBreadTextList = chatStore((state) => state.updateBreadTextList);

  return (
    <>
      <TextareaAutosize
        id="outlined-adornment-password"
        onChange={(e) => updateBreadTextList(e.target.value)}
        className={styles.textInput}
        value={breadTextList}
      />
    </>
  );
};

export default BreadTextStep;

BreadTextStep.propTypes = {
  activeStep: PropTypes.string,
  chatError: PropTypes.string,
  handleQuestionFromChild: PropTypes.func,
  passSelectedPerksToParent: PropTypes.func,
};
