import React, { useState, useEffect, useCallback } from "react";
//useContext
import { useActiveStep } from "../../utils/ActiveStepContext";
//API URL
// import { LocationListAPI } from "../../utils/apiUrl";
// import callAPI from "../../utils/apiAction";
//Common Components
import ButtonComponent from "../../commonComponents/ButtonComponent";
//MUI Components
//MUI ICONS
import LocationOnIcon from "@mui/icons-material/LocationOn";
//Assets
import animationData from "../../assets/spinner_loader.json";
//Other Library
import Lottie from "react-lottie";
import axios from "axios";
//Imports
import OhNoComponent from "./OhNoComponent";
import styles from "./styles.module.scss";
import InputFieldComponent from "../../commonComponents/InputFieldComponent";
import SelectComponent from "../../commonComponents/SelectComponent";

const modesOfTransport = [
  {
    id: "mot1",
    img_src:
      "https://img.freepik.com/free-vector/flat-design-indian-man-driving-van_23-2149757883.jpg?t=st=1726585863~exp=1726589463~hmac=672fd1fb8a123c0065e0d9696484c7f98e5131492c0111aaef74ca416346b790&w=826",
    title: "Auto",
  },
  {
    id: "mot2",
    img_src:
      "https://img.freepik.com/free-vector/bus-driver-concept-illustration_114360-6330.jpg?ga=GA1.1.1655513578.1726562178&semt=ais_hybrid",
    title: "Bus",
  },
  {
    id: "mot3",
    img_src:
      "https://img.freepik.com/free-vector/suv-car-concept-illustration_114360-13226.jpg?ga=GA1.1.1655513578.1726562178&semt=ais_hybrid",
    title: "Car",
  },
  {
    id: "mot4",
    img_src:
      "https://img.freepik.com/free-vector/hand-drawn-india-lifestyle-illustration_23-2149827027.jpg?ga=GA1.1.1655513578.1726562178&semt=ais_hybrid",
    title: "Cycle",
  },
  {
    id: "mot5",
    img_src:
      "https://img.freepik.com/free-vector/train-station-concept-illustration_114360-12177.jpg?ga=GA1.1.1655513578.1726562178&semt=ais_hybrid",
    title: "Train",
  },
  {
    id: "mot6",
    img_src:
      "https://img.freepik.com/free-vector/calling-taxi-concept-illustration_114360-24757.jpg?ga=GA1.1.1655513578.1726562178&semt=ais_hybrid",
    title: "Taxi",
  },
  {
    id: "mot7",
    img_src:
      "https://img.freepik.com/free-vector/walking-around-concept-illustration_114360-4033.jpg?ga=GA1.1.1655513578.1726562178&semt=ais_hybrid",
    title: "Walking",
  },
];

const ModesofTransportCard = ({
  id,
  img_src,
  title,
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

        <h3 className={styles.transportTitle}>{title}</h3>

      </div>
    </ButtonComponent>
  );
};

const Transport = () => {
  const { addToSelectedTransport, removeFromSelectedTransport, selectedTransportList } = useActiveStep();
  const [selectedMode, setSelectedMode] = useState({});
  const [enteredPercentages, setEnteredPercentages] = useState({});
  const [distributionMethod, setDistributionMethod] = useState('equal'); // 'equal' or 'percentage'
  const [selectedModesData, setSelectedModesData] = useState([]);

  const distributionOptions = [
    {value: "equal", label: "Equal Distribution"},
    {value: "percentage", label: "Percentage Wise"},
  ]
  const totalDistance = sessionStorage.getItem('distanceData');

  useEffect(() => {
    setSelectedMode(selectedTransportList.reduce((acc, id) => ({ ...acc, [id]: true }), {}));
  }, [selectedTransportList]);

  const handleSelect = (modeId) => {
    if (!selectedMode[modeId]) {
      addToSelectedTransport(modeId);
      const modeDetails = modesOfTransport.find(item => item.id === modeId);
      setSelectedModesData(prev => [...prev, {
        id: modeId,
        title: modeDetails.title,
        distance: distributedDistance[modeId] || 0
      }]);
    } else {
      removeFromSelectedTransport(modeId);
      setSelectedModesData(prev => prev.filter(item => item.id !== modeId));
    }
  };
  useEffect(() => {
    const modesData = selectedModesData.map(item => ({
      id: item.id,
      title: item.title,
      distance: item.distance
    }));
    sessionStorage.setItem("SelectedTransportModes", JSON.stringify(modesData));
  }, [selectedModesData]);



  useEffect(() => {
    sessionStorage.setItem("SelectedTransportModes", JSON.stringify(selectedTransportList));
  }, [selectedTransportList]);

  console.log("Selected Transport List : ", selectedTransportList.length);

  const handleDistributionChange = (method) => {
    setDistributionMethod(method);
    if (method === "equal") {
      setEnteredPercentages({});
    }
  };

  const handlePercentageChange = (modeId, value) => {
    setEnteredPercentages((prev) => ({
      ...prev,
      [modeId]: value,
    }));
  };

  const distributeDistance = () => {
    const selectedModes = Object.keys(selectedMode).filter((id) => selectedMode[id]);
    const totalModes = selectedModes.length;

    const modesWithDistances = {};

    if (distributionMethod === "equal") {
      const equalDistance = totalDistance / totalModes;
      selectedModes.forEach((modeId) => {
        const modeTitle = modesOfTransport.find((item) => item.id === modeId)?.title || "";
        modesWithDistances[modeId] = {
          id: modeId,
          title: modeTitle,
          distance: Math.round(equalDistance)
        };
      });
    } else if (distributionMethod === "percentage") {
      let totalPercentage = Object.values(enteredPercentages).reduce((sum, perc) => sum + parseFloat(perc || 0), 0);
      selectedModes.forEach((modeId) => {
        const modeTitle = modesOfTransport.find((item) => item.id === modeId)?.title || "";
        const percentage = parseFloat(enteredPercentages[modeId] || 0);
        const distance = Math.round((percentage / totalPercentage) * totalDistance);
        modesWithDistances[modeId] = {
          id: modeId,
          title: modeTitle,
          distance
        };
      });
    }

    // Store in sessionStorage
    sessionStorage.setItem("DistributedTransportModes", JSON.stringify(modesWithDistances));

    return modesWithDistances;
  };



  const distributedDistance = distributeDistance();

  const storedTransportModes = JSON.parse(sessionStorage.getItem("DistributedTransportModes"));
  console.log(storedTransportModes);



  return (
    <>
      <div className={styles.transportCard}>
        {modesOfTransport.map((item) => {
          return (
            <ModesofTransportCard
              id={item?.id}
              img_src={item?.img_src}
              title={item?.title}
              selected={selectedMode[item.id]}
              onSelect={() => handleSelect(item.id)}
            />
          );
        })}

      </div>

      <div className={styles.distributionOptions}>
        <SelectComponent  value={distributionMethod} options={distributionOptions} onChange={(e) => handleDistributionChange(e.target.value)}/>
         
      </div>

      {Object.entries(distributedDistance).map(([modeId, modeDetails]) => {
        const modeName = modesOfTransport.find((item) => item.id === modeId)?.title || "";
        return (
          <div key={modeId} className={styles.distanceDisplay}>
            <span>Mode: {modeDetails.title}</span>
            <span>Allocated Distance: {modeDetails.distance || 0} km</span>

            {distributionMethod === "percentage" && (
              <>
                <InputFieldComponent
                  type="number"
                  placeholder="Enter percentage"
                  value={enteredPercentages[modeId] || ""}
                  onChange={(e) => handlePercentageChange(modeId, e.target.value)}
                />
                <span>Percentage Entered: {enteredPercentages[modeId] || 0}%</span>
              </>
            )}
          </div>
        );
      })}



    </>
  );
};

export default Transport;
