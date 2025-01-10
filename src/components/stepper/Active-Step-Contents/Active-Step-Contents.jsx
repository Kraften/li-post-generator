import QuestionInput from "../Question-Input/Question-Input";
import ListAnswers from "../List-Answers/List-Answers";
import { STEPS } from "../../../constants/constants";
import { PropTypes } from "prop-types";
import BreadTextStep from "../Bread-Text-Step/Bread-Text-Step";

const ActiveStepContents = ({ activeStep, chatError }) => {
  const stepContentSwitcher = () => {
    switch (activeStep) {
      case STEPS.HOBBY:
        return <QuestionInput chatError={chatError}></QuestionInput>;
      case STEPS.PERKS:
        return <ListAnswers></ListAnswers>;
      case STEPS.CONFIRM:
        return <BreadTextStep></BreadTextStep>;
      default:
        break;
    }
  };

  return <>{stepContentSwitcher()}</>;
};

export default ActiveStepContents;

ActiveStepContents.propTypes = {
  activeStep: PropTypes.string,
  chatError: PropTypes.string,
  passSelectedPerksToParent: PropTypes.func,
};
