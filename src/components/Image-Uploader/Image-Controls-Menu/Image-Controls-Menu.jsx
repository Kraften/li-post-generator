import { useRef, useState, useEffect } from "react";
import styles from "./Image-Controls-Menu.module.scss";

import IconButton from "@mui/material/IconButton";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";

import placeholderImage from "/placeholder.svg";

import postStore from "./../../../store/postStore";
import sigmaBlackLogo from "/SC-logo_BLACK.png";
import sigmaWhiteLogo from "/SC-logo_WHITE.png";
import sigmaEngBlackLogo from "/190425_Engineering_by_SC_tag_BLACK.png";
import sigmaEngWhiteLogo from "/190425_Engineering_by_SC_tag_WHITE.png";
import Divider from "@mui/material/Divider";
import { PropTypes } from "prop-types";

export const LOGOS = {
  sigmaLogo: {
    black: sigmaBlackLogo,
    white: sigmaWhiteLogo,
  },
  sigmaEngLogo: {
    black: sigmaEngBlackLogo,
    white: sigmaEngWhiteLogo,
  },
};

const ImageControlsMenu = ({ onLogoChange }) => {
  const inputFile = useRef(null);
  const [selectedLogo, setSelectedLogo] = useState("sigmaEngLogo");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [logoColor, setLogoColor] = useState("black");
  const { updateImage } = postStore();

  const MENU_ITEMS = [
    { name: "selectImage", number: 1 },
    { name: "logoSelection", number: 2 },
    { name: "Confirm", number: 3 },
  ];

  useEffect(() => {
    console.log(logoColor);
    onLogoChange({ logo: selectedLogo, color: logoColor });
  }, [selectedLogo, logoColor]);

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateImage(URL.createObjectURL(file));
      setUploadedImage(URL.createObjectURL(file));
    }
  };
  const handleLogoChange = (event) => {
    setSelectedLogo(event.target.value);
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
                <CircleButton char={"+"}></CircleButton>
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
                    onChange={handleLogoChange}
                  />
                  <img
                    width={"100px"}
                    src={sigmaEngBlackLogo}
                    onClick={() => setSelectedLogo("sigmaEngLogo")}
                  />
                </label>
                <label>
                  <input
                    type="radio"
                    name="image"
                    checked={selectedLogo === "sigmaLogo"}
                    onChange={handleLogoChange}
                  />
                  <img
                    width={"100px"}
                    src={sigmaBlackLogo}
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
