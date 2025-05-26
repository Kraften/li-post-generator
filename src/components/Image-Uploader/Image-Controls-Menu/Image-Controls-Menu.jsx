import { useRef, useState, useEffect } from "react";
import styles from "./Image-Controls-Menu.module.scss";
import placeholderImage from "/placeholder.svg";
import postStore from "../../../store/postStore";
import { LOGOS } from "../../../constants/constants";
import { PropTypes } from "prop-types";

const ImageControlsMenu = ({ onLogoChange }) => {
  const inputFile = useRef(null);
  const [selectedLogo, setSelectedLogo] = useState("sigmaEngLogo");
  const [logoColor, setLogoColor] = useState("black");
  const { updateImage } = postStore();

  const MENU_ITEMS = [
    { name: "selectImage", number: 1 },
    { name: "logoSelection", number: 2 },
    { name: "Confirm", number: 3 },
  ];

  useEffect(() => {
    onLogoChange({ logo: selectedLogo, color: logoColor });
  }, [selectedLogo, logoColor]);

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        // Create canvas for image optimization
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Calculate new dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;
        const maxDimension = 1200; // Maximum dimension for LinkedIn posts

        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw image with optimization
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to optimized format
        const optimizedImage = canvas.toDataURL("image/jpeg", 0.85);
        updateImage(optimizedImage, { width, height });
      };
    };
  };

  const handleColorChange = (event) => {
    setLogoColor(event.target.value);
  };

  const Circle = ({ number }) => {
    return <div className={styles.circle}>{number}</div>;
  };

  const CircleButton = ({ char }) => {
    return <div className={styles.plusButton}>{char}</div>;
  };

  const menuItem = (item) => {
    switch (item.number) {
      case 1:
        return (
          <>
            <div className={styles.top}>
              <Circle number={1} />
              <p>Upload Photo from your computer:</p>
            </div>
            <div className={styles.imageUpload}>
              <div className={styles.relative}>
                <div className={styles.absolute}>
                  <div onClick={onButtonClick}>
                    <CircleButton char={"Add"}></CircleButton>
                  </div>
                  <img
                    src={placeholderImage}
                    alt=""
                    onClick={onButtonClick}
                    className={styles.image}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputFile}
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className={styles.top}>
              <Circle number={2} />
              <p>Upload Photo from your computer:</p>
            </div>
            <div className={styles.logoControls}>
              <div className={styles.logoPicker}>
                <label>
                  <input
                    type="radio"
                    name="image"
                    checked={selectedLogo === "sigmaEngLogo"}
                    onChange={() => setSelectedLogo("sigmaEngLogo")}
                  />
                  <img
                    width={"100px"}
                    src={LOGOS.sigmaEngLogo.black}
                    onClick={() => setSelectedLogo("sigmaEngLogo")}
                  />
                </label>
                <label>
                  <input
                    type="radio"
                    name="image"
                    checked={selectedLogo === "sigmaLogo"}
                    onChange={() => setSelectedLogo("sigmaLogo")}
                  />
                  <img
                    width={"100px"}
                    src={LOGOS.sigmaLogo.black}
                    onClick={() => setSelectedLogo("sigmaLogo")}
                  />
                </label>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className={styles.top}>
              <Circle number={3} />
              <p>Upload Photo from your computer:</p>
            </div>
            <div className={styles.colorControls}>
              <label className={styles.black}>
                <input
                  type="radio"
                  name="black"
                  value={"black"}
                  checked={logoColor === "black"}
                  onChange={handleColorChange}
                  style={{ display: "none" }}
                />
                <div
                  className={`${styles.box} ${styles.black} ${
                    logoColor === "black" ? styles.selected : ""
                  }`}
                ></div>
              </label>
              <label className={styles.white}>
                <input
                  type="radio"
                  name="white"
                  value={"white"}
                  checked={logoColor === "white"}
                  onChange={handleColorChange}
                  style={{ display: "none" }}
                />
                <div
                  className={`${styles.box} ${styles.white} ${
                    logoColor === "white" ? styles.selected : ""
                  }`}
                ></div>
              </label>
            </div>
          </>
        );
    }
  };

  return (
    <div className={styles.imageControls}>
      {MENU_ITEMS.map((item, i) => (
        <div className={styles.menuItem} key={i}>
          {menuItem(item)}
        </div>
      ))}
    </div>
  );
};

ImageControlsMenu.propTypes = {
  onLogoChange: PropTypes.func,
};

export default ImageControlsMenu;
