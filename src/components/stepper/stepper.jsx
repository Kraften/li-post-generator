import { useState, useEffect } from "react";
import styles from "./stepper.module.scss";
import ChatForm from "./../chat-form/chat-form";
import ListAnswers from "../list-answers/list-answers";
import chatStore from "./../../store/chatStore";

export const STEPS = {
  HOBBY: "Hobby",
  PERKS: "Select Perks",
  CONFIRM: "Confirm",
};

const StepperComponent = () => {
  const [hobbyText, setHobbyText] = useState("");
  const [activeStep, setActiveStep] = useState(STEPS.HOBBY);
  const listAnswer = chatStore((state) => state.listAnswer);

  useEffect(() => {
    console.log("🚀 ~ ChatForm ~ listAnswer:", listAnswer);
    if (listAnswer.length > 0) {
      setActiveStep(STEPS.PERKS);
    }
  }, [listAnswer]);

  const steps = [
    { title: "Hobby" },
    { title: "Select Perks" },
    { title: "Confirm" },
  ];

  const stepSwitcher = () => {
    switch (activeStep) {
      case STEPS.HOBBY:
        return <ChatForm></ChatForm>;

      case STEPS.PERKS:
        return <ListAnswers></ListAnswers>;
      case STEPS.CONFIRM:
        break;
      default:
        break;
    }
  };
  return (
    <div className={styles.wrapper}>
      <ul className={styles.steps}>
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
      <div className={styles.stepperContents}></div>
      {stepSwitcher()}
    </div>
  );
};

export default StepperComponent;
