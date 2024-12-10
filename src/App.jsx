import styles from "./app.module.scss";
import NumberedSelector from "./components/Numbered-Selector/Numbered-selector";
import { SECTION } from "./constants/constants";
import chatStore from "./store/chatStore";
import New from "./components/New";

const App = () => {
  const updateSelectedState = chatStore((state) => state.updateSelectedState);
  const selectedState = chatStore((state) => state.selectedState);

  const section = [
    { sectionNumber: "01", title: "Intro Text", isNumberLeft: true },
    { sectionNumber: "02", title: "Main Text", isNumberLeft: false },
    { sectionNumber: "03", title: "Picture", isNumberLeft: true },
  ];

  const handleSelectionFromChild = (section) => {
    switch (section) {
      case SECTION.FIRST:
        updateSelectedState(SECTION.FIRST);

        break;
      case SECTION.SECOND:
        updateSelectedState(SECTION.SECOND);

        break;
      case SECTION.THIRD:
        updateSelectedState(SECTION.THIRD);

        break;
      case SECTION.NONE:
        updateSelectedState(SECTION.NONE);

        break;
    }
  };

  return (
    <main>
      <section className={`${styles.header} fadeIn`}>
        <h1>Welcome to Content Generator</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat.
        </p>
      </section>
      <div className={styles.app}>
        <div className={`${styles.annotation} ${styles.annotation01}`}>
          <NumberedSelector
            style={{}}
            key={"01"}
            selectSection={handleSelectionFromChild}
            section={section[0]}
          ></NumberedSelector>
        </div>
        <div className={`${styles.annotation} ${styles.annotation02}`}>
          <NumberedSelector
            style={{}}
            key={"01"}
            selectSection={handleSelectionFromChild}
            section={section[1]}
          ></NumberedSelector>
        </div>
        <div className={styles.card}>
          <New></New>
        </div>
        <div className={`${styles.annotation} ${styles.annotation03}`}>
          <NumberedSelector
            style={{}}
            key={"01"}
            selectSection={handleSelectionFromChild}
            section={section[2]}
          ></NumberedSelector>
        </div>
      </div>
    </main>
  );
};

export default App;
