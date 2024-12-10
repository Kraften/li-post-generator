import React, { useState, useEffect } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";
import styles from "./Draggable-Logo.module.scss";

const DraggableLogo = ({ logo, position }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable-logo",
  });

  const style = {
    top: position.top,
    left: position.left,
    transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
  };

  return (
    <img
      ref={setNodeRef}
      className={styles.logoImage}
      src={logo}
      alt="Logo"
      style={{
        ...style,
      }}
      {...listeners}
      {...attributes}
    />
  );
};
export default DraggableLogo;
