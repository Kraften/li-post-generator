import LinkedInPost from "./components/Li-Post/Li-Post";
import styles from "./app.module.scss";
import NumberedSelector from "./components/Numbered-Selector/Numbered-selector";
import { SECTION } from "./constants/constants";
import chatStore from "./store/chatStore";

const App = () => {
  const updateSelectedState = chatStore((state) => state.updateSelectedState);

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
      <section>
        <ul className={`${styles.numbers}`}>
          <div className={styles.leftSide}>
            <div className={styles.selector1}>
              <NumberedSelector
                key={section.sectionNumber}
                selectSection={handleSelectionFromChild}
                section={section[0]}
              ></NumberedSelector>
            </div>
            <div className={styles.selector3}>
              <NumberedSelector
                key={section.sectionNumber}
                selectSection={handleSelectionFromChild}
                section={section[2]}
              ></NumberedSelector>
            </div>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.selector2}>
              <NumberedSelector
                key={section.sectionNumber}
                selectSection={handleSelectionFromChild}
                section={section[1]}
              ></NumberedSelector>
            </div>
          </div>

          <div className={`${styles.postContainer}`}>
            <LinkedInPost></LinkedInPost>
          </div>
        </ul>
      </section>
    </main>
  );
};

export default App;
