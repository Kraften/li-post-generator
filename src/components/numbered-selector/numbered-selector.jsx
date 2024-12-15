import styles from "./numbered-selector.module.scss";
import PropTypes from "prop-types";

const NumberedSelector = ({ section, selectSection, style }) => {
  const svgLine = () => {
    return (
      <svg width="130" height="60">
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
  const style2 = {
    ...style,
  };
  return (
    <div
      style={style2}
      className={`${styles.numberedSelector} fadeIn `}
      onClick={handleSectionClick}
    >
      <li className={`${styles.numberWrapper}`}>
        {section.isNumberLeft ? (
          <span className={`${styles.number} `}>{section.sectionNumber}</span>
        ) : null}
        {!section.isNumberLeft ? (
          <div
            className={`${styles.line} ${styles.flipLine} ${styles.transform}`}
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
      <span
        className={`${styles.text} ${!section.isNumberLeft ? "flexEnd" : ""}`}
      >
        {section.title}
      </span>
    </div>
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
