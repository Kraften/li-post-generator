import { useState } from "react";
import postStore from "../../../store/postStore";
import styles from "./list-answers.module.scss";
import { PropTypes } from "prop-types";

const ListAnswers = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { listOfPerks, updateSelectedPerksList } = postStore();

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
      updateSelectedPerksList(item);
    }
  };

  return (
    <ul className={styles.list}>
      {listOfPerks?.map((item, i) => {
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
