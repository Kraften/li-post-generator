import { useState, useEffect } from "react";
import LinkedInPost2 from "./components/Li-Post/Li-Post2";
import styles from "./app.module.scss";
import NumberedSelector from "./components/Numbered-Selector/Numbered-selector";
import StepperComponent from "./components/Stepper/Stepper";
import { SECTION } from "./constants/constants";

const App = () => {
  const [activeSelection, setActiveSelection] = useState(SECTION.NONE);
  const section = [
    { sectionNumber: "01", title: "Intro Text", isNumberLeft: true },
    { sectionNumber: "02", title: "Main Text", isNumberLeft: false },
    { sectionNumber: "03", title: "Picture", isNumberLeft: true },
  ];

  const handleSelectionFromChild = (section) => {
    switch (section) {
      case SECTION.FIRST:
        setActiveSelection(SECTION.FIRST);
        break;
      case SECTION.SECOND:
        setActiveSelection(SECTION.SECOND);
        break;
      case SECTION.THIRD:
        setActiveSelection(SECTION.THIRD);
        break;
      case SECTION.NONE:
        setActiveSelection(SECTION.NONE);
        break;
    }
  };

  const handleCloseSection = () => {
    setActiveSelection(SECTION.NONE);
  };

  return (
    <main>
      <div className={styles.navigation}>
        <ul className={styles.numbers}>
          {section.map((section) => {
            return (
              <NumberedSelector
                key={section.sectionNumber}
                selectSection={handleSelectionFromChild}
                section={section}
              ></NumberedSelector>
            );
          })}
        </ul>
      </div>
      <div className={styles.post}>
        <LinkedInPost2
          sectionSelected={activeSelection}
          sendDataToParent={handleCloseSection}
        ></LinkedInPost2>
      </div>
      {/* {loading ? <LoadingSpinner></LoadingSpinner> : null} */}
    </main>
  );
};

export default App;
