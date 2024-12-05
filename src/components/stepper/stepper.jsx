import { useState } from "react";
import styles from "./Stepper.module.scss";
import chatStore from "../../store/chatStore.js";
import { run, extractBulletPointsAndHeaders } from "../../config/gemini.js";
import ActiveStepContents from "./Active-Step-Contents/Active-Step-Contents";
import { SECTION, STEPS } from "../../constants/constants.js";
import ButtonRowContents from "./Button-Row-Contents/Button-Row-Contents";
import { PropTypes } from "prop-types";

const StepperComponent = () => {
  const [activeStep, setActiveStep] = useState(STEPS.HOBBY);
  const [questionText, setQuestionText] = useState("");
  const [loading, setLoading] = useState(false);

  const [chatError, setChatError] = useState("");
  const updateListAnswer = chatStore((state) => state.updateListAnswer);
  const selectedListItems = chatStore((state) => state.selectedListItems);
  const updateSelectedState = chatStore((state) => state.updateSelectedState);
  const updateBreadTextList = chatStore((state) => state.updateBreadTextList);

  const askQuestionToAi = async (prompt) => {
    const handleError = (error) => {
      if (error.status === 503) {
        setChatError("The model is overloaded. Please try again later.");
      }
    };
    updateListAnswer([]);
    setLoading(true);
    const answer = await run(prompt).catch(handleError);
    setLoading(false);
    const answersList = extractBulletPointsAndHeaders(answer.response.text());
    const filteredList = answersList.filter(
      (item) => item.bulletPoint.trim() !== ""
    );
    answersList.length > 0 ? setActiveStep(STEPS.PERKS) : null;
    updateListAnswer(filteredList);
  };

  const LoadingSpinner = () => (
    <>
      <div className={styles.modalOverlay}></div>
      <div className={styles.spinner}></div>
    </>
  );

  const askQuestionToAi2 = async (prompt) => {
    const handleError = (error) => {
      if (error.status === 503) {
        setChatError("The model is overloaded. Please try again later.");
      }
    };
    setLoading(true);
    const answer = await run(prompt).catch(handleError);
    setLoading(false);

    updateBreadTextList(answer.response.text());
    if (answer.response.text() !== "") {
      setActiveStep(STEPS.CONFIRM);
    }
  };

  const steps = [
    { id: 1, title: "Hobby" },
    { id: 2, title: "Select Perks" },
    { id: 3, title: "Confirm" },
  ];

  const handleSendPerksQuestion = () => {
    const continuousString = selectedListItems
      .map((item) => `${item.header}: ${item.bulletPoint}`)
      .join(" ");

    const perksQuestion = `Write a 200 word text about a person that has these skills and how they help his work: ${continuousString}`;
    askQuestionToAi2(perksQuestion);
  };

  const handleQuestionFromChild = (q) => {
    setQuestionText(q);
  };

  const hobbyQuestion = `the person is a ${questionText} witch skills could he learn that helps in work life`;
  // const hobbyQuestion2 = `the person is a ${questionText} witch skills could he learn that helps in work life as a ${prof}`;

  const handleSendHobbyQuestion = () => {
    askQuestionToAi(hobbyQuestion);
  };

  const handleCloseStepper = () => {
    updateSelectedState(SECTION.NONE);
  };

  return (
    <div className={styles.stepper}>
      <div className={styles.stepsRowWrapper}>
        <ul className={styles.stepsRow}>
          <li>
            <div className={styles.circleWrapper}>
              <div>
                <div className={styles.circleLineRow}>
                  <span
                    className={`${styles.circle} ${
                      activeStep === "Hobby" ? styles.activeCircle : ""
                    }`}
                  ></span>
                  <div className={styles.lineWrapper}>
                    <div className={styles.line}></div>
                  </div>
                </div>
                <div className={styles.titleWrapper}>
                  <div className={styles.title}>Hobby</div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.circleWrapper}>
              <div>
                <div className={styles.circleLineRow}>
                  <span
                    className={`${styles.circle} ${
                      activeStep === "Select Perks" ? styles.activeCircle : ""
                    }`}
                  ></span>
                  <div className={styles.lineWrapper}>
                    <div className={styles.line}></div>
                  </div>
                </div>
                <div className={styles.titleWrapper}>
                  <div className={styles.title}>Hobby</div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.circleWrapper}>
              <div>
                <div className={styles.circleLineRow}>
                  <span
                    className={`${styles.circle} ${
                      activeStep === "Confirm" ? styles.activeCircle : ""
                    }`}
                  ></span>
                </div>
                <div className={styles.titleWrapper}>
                  <div className={styles.title}>Hobby</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <span className={styles.x} onClick={handleCloseStepper}>
          X
        </span>
      </div>
      <div className={styles.contentsRow}>
        {/* <LoadingSpinner></LoadingSpinner> */}
        {loading ? <LoadingSpinner></LoadingSpinner> : null}

        <ActiveStepContents
          activeStep={activeStep}
          handleQuestionFromChild={handleQuestionFromChild}
        ></ActiveStepContents>
      </div>
      <div className={styles.buttonsRow}>
        <ButtonRowContents
          activeStep={activeStep}
          handleSendHobbyQuestion={handleSendHobbyQuestion}
          handleSendPerksQuestion={handleSendPerksQuestion}
        ></ButtonRowContents>
      </div>
    </div>
  );
};

export default StepperComponent;

StepperComponent.propTypes = {
  sendCloseToParent: PropTypes.func,
};
