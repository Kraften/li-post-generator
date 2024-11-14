import { useState, useEffect } from "react";
import LinkedInPost from "./components/li-post/li-post";
import styles from "./app.module.scss";
import NumberedSelector from "./components/numbered-selector/numbered-selector";
import StepperComponent from "./components/stepper/stepper";

export const Sections = {
  NONE: "00",
  FIRST: "01",
  SECOND: "02",
  THIRD: "03",
};
const App = () => {
  const [activeSelection, setActiveSelection] = useState(Sections.NONE); // State to track loading
  const section = [
    { sectionNumber: "01", title: "Intro Text", isNumberLeft: true },
    { sectionNumber: "02", title: "Main Text", isNumberLeft: false },
    { sectionNumber: "03", title: "Picture", isNumberLeft: true },
  ];

  const handleSelectionFromChild = (section) => {
    console.log("🚀 ~ handleSelectionFromChild ~ asd:", section);
    switch (section) {
      case Sections.FIRST:
        setActiveSelection(Sections.FIRST);
        break;
      case Sections.SECOND:
        setActiveSelection(Sections.SECOND);
        break;
      case Sections.THIRD:
        setActiveSelection(Sections.THIRD);
        break;
      case Sections.NONE:
        setActiveSelection(Sections.NONE);
        break;
    }
  };

  const handleCloseSection = () => {
    setActiveSelection(Sections.NONE);
  };

  return (
    <main>
      <StepperComponent></StepperComponent>
      {/* <div className={styles.navigation}>
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
        <LinkedInPost
          sectionSelected={activeSelection}
          sendDataToParent={handleCloseSection}
        ></LinkedInPost>
      </div> */}
      {/* {loading ? <LoadingSpinner></LoadingSpinner> : null} */}
    </main>
  );
};

export default App;
