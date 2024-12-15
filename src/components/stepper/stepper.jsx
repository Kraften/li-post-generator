import { useState } from "react";
import styles from "./Stepper.module.scss";
import chatStore from "../../store/chatStore.js";
import { run, extractBulletPointsAndHeaders } from "../../config/gemini.js";
import ActiveStepContents from "./Active-Step-Contents/Active-Step-Contents";
import { SECTION, STEPS } from "../../constants/constants.js";
import ButtonRowContents from "./Button-Row-Contents/Button-Row-Contents";
import { PropTypes } from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const StepperComponent = () => {
  const [activeStep, setActiveStep] = useState(STEPS.HOBBY);
  const [questionText, setQuestionText] = useState("");
  const [loading, setLoading] = useState(false);

  const [chatError, setChatError] = useState("");
  const updateListAnswer = chatStore((state) => state.updateListAnswer);
  const selectedListItems = chatStore((state) => state.selectedListItems);
  const updateSelectedState = chatStore((state) => state.updateSelectedState);
  const updateBreadTextList = chatStore((state) => state.updateBreadTextList);

  const fetchAIResponse = async (prompt) => {
    setLoading(true);
    try {
      const answer = await run(prompt);
      return answer.response.text();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error) => {
    console.error("Error:", error);
    setChatError("Something went wrong. Please try again.");
  };

  const handleSendHobbyQuestion = async (nextStep) => {
    const hobbyQuestion = `the person is a ${questionText} witch skills could he learn that helps in work life`;
    const answer = await fetchAIResponse(hobbyQuestion);
    const answersList = extractBulletPointsAndHeaders(answer);
    const filteredList = answersList.filter(
      (item) => item.bulletPoint.trim() !== ""
    );
    updateListAnswer(filteredList);
    setActiveStep(nextStep);
  };

  const handleSendPerksQuestion = async (nextStep) => {
    const continuousString = selectedListItems
      .map((item) => `${item.header}: ${item.bulletPoint}`)
      .join(" ");
    const perksQuestion = `Write a 200-word text about a person with these skills: ${continuousString}`;
    const answer = await fetchAIResponse(perksQuestion);
    updateBreadTextList(answer);
    setActiveStep(nextStep);
  };

  const LoadingSpinner = () => (
    <>
      <div className="absoluteWithBlur"></div>
      <div className={styles.spinner}></div>
    </>
  );

  const steps = ["Hobby", "Select Perks", "Confirm"];

  const StepIndicator = ({ step, isActive }) => (
    <li>
      <div className={styles.circleWrapper}>
        <span
          className={`${styles.circle} ${isActive ? styles.activeCircle : ""}`}
        ></span>
      </div>
      {step !== "Confirm" && (
        <div className={styles.lineWrapper}>
          <div className={styles.line}></div>
        </div>
      )}
      <div className={styles.titleWrapper}>
        <div className={styles.title}>{step}</div>
      </div>
    </li>
  );

  const handleQuestionFromChild = (q) => {
    setQuestionText(q);
  };

  const handleCloseStepper = () => {
    updateSelectedState(SECTION.NONE);
  };

  return (
    <div className={styles.stepper}>
      <div className={styles.stepsRowWrapper}>
        <ul className={styles.stepsRow}>
          {steps.map((step) => (
            <StepIndicator
              key={step}
              step={step}
              isActive={activeStep === step}
            />
          ))}
        </ul>
        <IconButton
          className={styles.x}
          size="large"
          onClick={handleCloseStepper}
          disableRipple
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div className={styles.contentsRow}>
        <div className={styles.loading}></div>
        {loading ? <LoadingSpinner></LoadingSpinner> : null}

        <ActiveStepContents
          activeStep={activeStep}
          handleQuestionFromChild={handleQuestionFromChild}
          chatError={chatError}
        ></ActiveStepContents>
      </div>
      <div className={styles.buttonsRow}>
        <ButtonRowContents
          isDisabled={loading}
          activeStep={activeStep}
          handleSendHobbyQuestion={() => handleSendHobbyQuestion(STEPS.PERKS)}
          handleSendPerksQuestion={() => handleSendPerksQuestion(STEPS.CONFIRM)}
        ></ButtonRowContents>
      </div>
    </div>
  );
};

export default StepperComponent;

StepperComponent.propTypes = {
  sendCloseToParent: PropTypes.func,
};
