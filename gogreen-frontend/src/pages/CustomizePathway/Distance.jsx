import React, { useState, useEffect } from "react";
//useContext
import { useActiveStep } from "../../utils/ActiveStepContext";
//API URL
// import { CourseListAPI } from "../../utils/apiUrl";
// import callAPI from "../../utils/apiAction";
//Common Components
import ButtonComponent from "../../commonComponents/ButtonComponent";
//MUI ICONS
import SchoolIcon from "@mui/icons-material/School";
//Assets
import animationData from "../../assets/spinner_loader.json";
import Lottie from "react-lottie";
//Import
import OhNoComponent from "./OhNoComponent";
import styles from "./styles.module.scss"

export const DegreeCard = ({
  id,
  img_src,
  title,
  full_name,
  icon,
  selected,
  onSelect,
}) => {
  return (
    <ButtonComponent
      className={`${styles.contentButton} ${selected ? styles.selected : ""}`}
      onClick={() => onSelect(id)}
    >
      <div key={id} className={styles.content}>
        <>{icon ? icon : <img src={img_src} className={styles.icon} />}</>
        <div className={styles.degreeContentContainer}>
          <h3 className={styles.degreeTitle}>{title}</h3>
          <p className={styles.degreeFullname}>{full_name ? (`${full_name}`) : ""}</p>
        </div>
      </div>
    </ButtonComponent>
  );
};

const Distance = () => {
  const {
    selectedDegree,
    selectDegree,
    updateDataAvailability,
    dataAvailable,
  } = useActiveStep();
  const userName = sessionStorage.getItem("name");
  const [distanceData, setDistanceData] = useState("");
  console.log({ selectedDegree });
  console.log(selectedDegree);
  sessionStorage.setItem("DegreeID", selectedDegree);
  

  return (
    <>
    <div>
      <h1>Distance</h1>
      <label>Enter the distance travelled </label>
      <input 
        value={distanceData} 
        onChange={(e)=>setDistanceData(e.target.value)}
        onKeyDown={(event) => {
          const char = event.key;
          const currentValue = event.target.value;
          if (/^[0-9]$/.test(char) && !(currentValue === "" && char === "0") || char === "Backspace" || char === "ArrowLeft" || char === "ArrowRight") {
            return true;
          } else {
            event.preventDefault();
          }
        }}
      />
    </div>
    </>
  );
};

export default Distance;