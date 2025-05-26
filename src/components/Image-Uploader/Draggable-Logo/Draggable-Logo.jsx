import { useDraggable } from "@dnd-kit/core";
import { forwardRef, useImperativeHandle, useEffect, useState } from "react";
import styles from "./Draggable-Logo.module.scss";
import PropTypes from "prop-types";

const DraggableLogo = forwardRef(({ logo, position, setPosition }, ref) => {
  const [constraints, setConstraints] = useState({
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
  });
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable-logo",
  });

  useEffect(() => {
    const updateConstraints = () => {
      const logoElement = setNodeRef.current;
      if (logoElement) {
        const parentElement = logoElement.parentElement;
        if (parentElement) {
          const parentRect = parentElement.getBoundingClientRect();
          const logoRect = logoElement.getBoundingClientRect();

          setConstraints({
            minX: 32,
            maxX: parentRect.width - logoRect.width - 32,
            minY: 32,
            maxY: parentRect.height - logoRect.height - 32,
          });
        }
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, [setNodeRef]);

  const handleDragEnd = () => {
    if (transform) {
      const newTop = Math.min(
        Math.max(position.top + transform.y, constraints.minY),
        constraints.maxY
      );
      const newLeft = Math.min(
        Math.max(position.left + transform.x, constraints.minX),
        constraints.maxX
      );
      setPosition({ top: newTop, left: newLeft });
    }
  };

  const style = {
    top: position.top + (transform?.y || 0),
    left: position.left + (transform?.x || 0),
  };

  useImperativeHandle(ref, () => ({
    getLogoElement: () => setNodeRef.current,
  }));

  return (
    <img
      ref={setNodeRef}
      className={styles.logoImage}
      src={logo}
      alt="Logo"
      style={style}
      {...listeners}
      {...attributes}
      onDragEnd={handleDragEnd}
    />
  );
});

DraggableLogo.propTypes = {
  logo: PropTypes.string.isRequired,
  position: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }).isRequired,
  setPosition: PropTypes.func.isRequired,
};

DraggableLogo.displayName = "DraggableLogo";

export default DraggableLogo;
