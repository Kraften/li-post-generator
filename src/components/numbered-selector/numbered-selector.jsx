import styles from "./numbered-selector.module.scss";
import PropTypes from "prop-types";

const NumberedSelector = ({ section, selectSection }) => {
  const svgLine = () => {
    return (
      <svg width="150" height="60">
        <path
          d="M 0 10 H 50 L 85 45 H 135"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    );
  };
  const handleSectionClick = () => {
    selectSection(section.sectionNumber);
  };

  return (
    <li className={`${styles.wrapper}`} onClick={handleSectionClick}>
      {section.isNumberLeft ? (
        <span className={`${styles.number} `}>{section.sectionNumber}</span>
      ) : null}
      {!section.isNumberLeft ? (
        <div
          className={`${styles.line} ${
            section.sectionNumber !== "01" ? styles.flipLine : null
          }`}
        >
          {svgLine()}
        </div>
      ) : null}

      {section.isNumberLeft ? (
        <div
          className={`${styles.line} ${
            section.sectionNumber !== "01" ? styles.flipLine : null
          }`}
        >
          {svgLine()}
        </div>
      ) : null}
      {!section.isNumberLeft ? (
        <span className={styles.number}>{section.sectionNumber}</span>
      ) : null}
    </li>
  );
};

export default NumberedSelector;

NumberedSelector.propTypes = {
  selectSection: PropTypes.func,
  section: PropTypes.shape({
    sectionNumber: PropTypes.string,
    title: PropTypes.string,
    isNumberLeft: PropTypes.bool,
  }),
};
