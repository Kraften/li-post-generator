import styles from "./app.module.scss";
import NumberedSelector from "./components/Numbered-Selector/Numbered-selector";
import { SECTION } from "./constants/constants";
import chatStore from "./store/chatStore";
import New from "./components/New";

const App = () => {
  // const updateSelectedState = chatStore((state) => state.updateSelectedState);
  // const selectedState = chatStore((state) => state.selectedState);

  // const section = [
  //   { sectionNumber: "01", title: "Intro Text", isNumberLeft: true },
  //   { sectionNumber: "02", title: "Main Text", isNumberLeft: false },
  //   { sectionNumber: "03", title: "Picture", isNumberLeft: true },
  // ];

  // const handleSelectionFromChild = (section) => {
  //   switch (section) {
  //     case SECTION.FIRST:
  //       updateSelectedState(SECTION.FIRST);

  //       break;
  //     case SECTION.SECOND:
  //       updateSelectedState(SECTION.SECOND);

  //       break;
  //     case SECTION.THIRD:
  //       updateSelectedState(SECTION.THIRD);

  //       break;
  //     case SECTION.NONE:
  //       updateSelectedState(SECTION.NONE);

  //       break;
  //   }
  // };

  return (
    <main>
      {/* <section className={`${styles.header} fadeInAnimation`}>
        <h1>Welcome to Content Generator</h1>
        <p>
          An app using AI to generate professional and engaging LinkedIn
          content, including text and images tailored for personal and corporate
          branding.
        </p>
      </section> */}

      <New></New>
    </main>
  );
};

export default App;
