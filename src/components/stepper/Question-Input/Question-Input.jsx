import { useEffect } from "react";
import styles from "./Question-Input.module.scss";
import TextField from "@mui/material/TextField";
import { PropTypes } from "prop-types";
import userStore from "./../../../store/userStore";

const QuestionInput = ({ chatError }) => {
  const { user, setUser } = userStore();

  return (
    <div className={styles.questionWrapper}>
      <TextField
        id=""
        label="First Name"
        variant="standard"
        onChange={(e) => setUser({ firstName: e.target.value })}
      />
      <TextField
        id=""
        label="Last Name"
        variant="standard"
        onChange={(e) => setUser({ lastName: e.target.value })}
      />
      <TextField
        id=""
        label="Occupation"
        variant="standard"
        onChange={(e) => setUser({ occupation: e.target.value })}
      />
      <TextField
        size="large"
        className={styles.input}
        label="Hobby/Activity"
        variant="standard"
        onChange={(e) => setUser({ hobby: e.target.value })}
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
