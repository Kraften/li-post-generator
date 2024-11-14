import { useEffect, useState } from "react";
import chatStore from "../../store/chatStore";
import styles from "./list-answers.module.scss";

const ListAnswers = () => {
  const listAnswer = chatStore((state) => state.listAnswer);
  const [selectedItems, setSelectedItems] = useState([]);

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
    }
  };

  useEffect(() => {}, [listAnswer]);

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
                ? "#D3E4CD" // Highlight selected item
                : "white",
            }}
          >
            {item.header}
            {/* <p>{item.bulletPoint}</p> */}
          </li>
        );
      })}
    </ul>
  );
};

export default ListAnswers;
