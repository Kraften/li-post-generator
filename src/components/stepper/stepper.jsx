import { useState, useEffect } from "react";
import styles from "./Stepper.module.scss";
import chatStore from "../../store/chatStore.js";
import { run, extractBulletPointsAndHeaders } from "../../config/gemini.js";
import ActiveStepContents from "./Active-Step-Contents/Active-Step-Contents";
import ButtonRowContents from "./Button-Row-Contents/Button-Row-Contents";
import { STEPS } from "../../constants/constants.js";
import { dummyData } from "./List-Answers/List-Answers.jsx";

const StepperComponent = () => {
  const [activeStep, setActiveStep] = useState(STEPS.HOBBY);
  const [questionText, setQuestionText] = useState("");
  const [chatError, setChatError] = useState("");
  const [finalText, setFinalText] = useState("");
  const updateListAnswer = chatStore((state) => state.updateListAnswer);
  const listAnswer = chatStore((state) => state.listAnswer);
  const [selectedItems, setSelectedItems] = useState([]);
  const selectedListAnswer = chatStore((state) => state.selectedListAnswer);
  const updateBreadTextList = chatStore((state) => state.updateBreadTextList);
  const breadTextList = chatStore((state) => state.breadTextList);

  useEffect(() => {
    if (listAnswer.length > 0) {
      setActiveStep(STEPS.PERKS);
    }
  }, [listAnswer]);
  useEffect(() => {
    if (breadTextList.length > 0) {
      setActiveStep(STEPS.CONFIRM);
    }
  }, [breadTextList]);

  const askQuestionToAi = async (prompt) => {
    const handleError = (error) => {
      if (error.status === 503) {
        setChatError("The model is overloaded. Please try again later.");
      }
    };
    updateListAnswer([]);
    // setLoading(true);
    const answer = await run(prompt).catch(handleError);
    // setLoading(false);
    const answersList = extractBulletPointsAndHeaders(answer.response.text());
    const filteredList = answersList.filter(
      (item) => item.bulletPoint.trim() !== ""
    );

    updateListAnswer(filteredList);
  };

  const askQuestionToAi2 = async (prompt) => {
    const handleError = (error) => {
      if (error.status === 503) {
        setChatError("The model is overloaded. Please try again later.");
      }
    };
    setFinalText("");
    // setLoading(true);
    const answer = await run(prompt).catch(handleError);
    // setLoading(false);
    updateBreadTextList(answer.response.text());
    setFinalText(answer.response.text());
    console.log("FINAL", answer.response.text());
  };

  const steps = [
    { title: "Hobby" },
    { title: "Select Perks" },
    { title: "Confirm" },
  ];

  const handleSendPerksQuestion = () => {
    const continuousString = listAnswer
      .map((item) => `${item.header}: ${item.bulletPoint}`)
      .join(" ");

    const perksQuestion = `Write a 100 word text about a person that has these skills and how they help his work: ${continuousString}`;
    askQuestionToAi2(perksQuestion);
    console.log("questionText", hobbyQuestion);
  };

  const handleQuestionFromChild = (q) => {
    setQuestionText(q);
  };

  const hobbyQuestion = `the person is a ${questionText} witch skills could he learn that helps in work life`;

  const handleSendHobbyQuestion = () => {
    askQuestionToAi(hobbyQuestion);
    console.log("questionText", hobbyQuestion);
  };

  const handleSelectedPerks = (a) => {
    setSelectedItems(a);
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.stepsRow}>
        {steps.map((step) => {
          return (
            <li key={step.title}>
              <span
                className={`${styles.circle} ${
                  activeStep === step.title ? styles.activeCircle : ""
                }`}
              ></span>
              {step.title}
            </li>
          );
        })}
      </ul>
      <div className={styles.contentsRow}>
        <ActiveStepContents
          activeStep={activeStep}
          handleQuestionFromChild={handleQuestionFromChild}
          passSelectedPerksToParent={handleSelectedPerks}
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
