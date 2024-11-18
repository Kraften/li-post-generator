import { useState } from "react";
import chatStore from "../../../store/chatStore";
import styles from "./list-answers.module.scss";
import { PropTypes } from "prop-types";
export const dummyData = [
  {
    header: "Introduction",
    bulletPoint: "This section covers the basics of the topic.",
  },
  {
    header: "Features",
    bulletPoint: "Highlights the key features and benefits.",
  },
  {
    header: "Requirements",
    bulletPoint: "Lists the prerequisites and necessary tools.",
  },
  {
    header: "Setup Instructions",
    bulletPoint: "Step-by-step guide on how to get started.",
  },
  {
    header: "FAQs",
    bulletPoint: "Answers to common questions users might have.",
  },
  {
    header: "Introduction",
    bulletPoint:
      "This section covers the basics of the topic.This section covers the basics of the topic.This section covers the basics of the topic.This section covers the basics of the topic.",
  },
  {
    header: "Features",
    bulletPoint: "Highlights the key features and benefits.",
  },
  {
    header: "Requirements",
    bulletPoint: "Lists the prerequisites and necessary tools.",
  },
  {
    header: "Setup Instructions",
    bulletPoint: "Step-by-step guide on how to get started.",
  },
  {
    header: "FAQs",
    bulletPoint: "Answers to common questions users might have.",
  },
];

const ListAnswers = ({ passSelectedPerksToParent }) => {
  const listAnswer = chatStore((state) => state.listAnswer);
  const [selectedItems, setSelectedItems] = useState([]);
  const selectedListAnswer = chatStore((state) => state.selectedListAnswer);

  const updateSelectedListAnswer = chatStore(
    (state) => state.updateSelectedListAnswer
  );
  const handleSelectItem = (item) => {
    const isSelected = selectedItems.some(
      (selectedItem) => selectedItem.bulletPoint === item.bulletPoint
    );

    if (isSelected) {
      setSelectedItems(
        selectedItems.filter(
          (selectedItem) => selectedItem.bulletPoint !== item.bulletPoint
        )
      );
    } else {
      setSelectedItems([...selectedItems, item]);
      console.log(selectedItems);
      passSelectedPerksToParent(selectedItems);
      updateSelectedListAnswer();
    }
  };

  return (
    <ul className={styles.list}>
      {listAnswer?.map((item, i) => {
        return (
          <li
            onClick={() => handleSelectItem(item)}
            key={i}
            className={styles.listItem}
            style={{
              cursor: "pointer",
              backgroundColor: selectedItems.some(
                (selectedItem) => selectedItem.bulletPoint === item.bulletPoint
              )
                ? "#D3E4CD"
                : "white",
            }}
          >
            <p className={styles.liHeader}>{item.header}</p>
            <p className={styles.liBulletPoint}>{item.bulletPoint}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default ListAnswers;

ListAnswers.propTypes = {
  passSelectedPerksToParent: PropTypes.func,
};
