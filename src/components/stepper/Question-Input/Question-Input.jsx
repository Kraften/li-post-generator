import { useEffect } from "react";
import styles from "./Question-Input.module.scss";
import TextField from "@mui/material/TextField";
import { PropTypes } from "prop-types";

const QuestionInput = ({ sendQuestionTextToParent, chatError }) => {
  const handleChange = (e) => {
    sendQuestionTextToParent(e.target.value);
  };

  useEffect(() => {}, []);

  return (
    <div className={styles.questionWrapper}>
      <TextField
        size="large"
        className={styles.input}
        id="standard-basic"
        label="Identify Key Activities:"
        variant="standard"
        onChange={(e) => handleChange(e)}
        type="text"
      />
      <span>{chatError}</span>
    </div>
  );
};

export default QuestionInput;

QuestionInput.propTypes = {
  sendQuestionTextToParent: PropTypes.func,
  chatError: PropTypes.string,
};
