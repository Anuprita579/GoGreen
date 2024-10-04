import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
//useContext
import { useActiveStep } from "../../utils/ActiveStepContext";
//Common Components
import ButtonComponent from "../../commonComponents/ButtonComponent";
import InputFieldComponent from "../../commonComponents/InputFieldComponent";
import SelectComponent from "../../commonComponents/SelectComponent";
import ModalComponent from "../../commonComponents/ModalComponent";
//Assets
import endMarkerImg from "../../assets/endMarkerImg.png";
import startMarkerImg from "../../assets/startMarkerImg.png";
import middleMarkerImg from "../../assets/middleMarkerImg.png";
//Imports
import styles from "./styles.module.scss";

// Custom icons for the markers
const startIcon = L.icon({
  iconUrl: startMarkerImg,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const endIcon = L.icon({
  iconUrl: endMarkerImg,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const middleIcon = L.icon({
  iconUrl: middleMarkerImg,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const modesOfTransport = [
  {
    id: "mot1",
    img_src:
      "https://img.freepik.com/free-vector/flat-design-indian-man-driving-van_23-2149757883.jpg?t=st=1726585863~exp=1726589463~hmac=672fd1fb8a123c0065e0d9696484c7f98e5131492c0111aaef74ca416346b790&w=826",
    title: "Auto",
    children: [
      { id: "mot11", title: "CNG Auto" },
      { id: "mot12", title: "Petrol Auto" },
    ],
  },
  {
    id: "mot2",
    img_src:
      "https://img.freepik.com/free-vector/bus-driver-concept-illustration_114360-6330.jpg?ga=GA1.1.1655513578.1726562178&semt=ais_hybrid",
    title: "Bus",
    children: [
      { id: "mot21", title: "EV Bus" },
      { id: "mot22", title: "Normal Bus" },
    ],
  },
  {
    id: "mot3",
    img_src:
      "https://img.freepik.com/free-vector/suv-car-concept-illustration_114360-13226.jpg?ga=GA1.1.1655513578.1726562178&semt=ais_hybrid",
    title: "Car",
    children: [
      { id: "mot31", title: "EV Car" },
      { id: "mot32", title: "Petrol Car" },
    ],
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
        {icon ? icon : <img src={img_src} alt="icon" className={styles.icon} />}

        <h3 className={styles.transportTitle}>{title}</h3>
      </div>
    </ButtonComponent>
  );
};

const Transport = () => {
  const {
    addToSelectedTransport,
    removeFromSelectedTransport,
    selectedTransportList,
  } = useActiveStep();
  const [selectedMode, setSelectedMode] = useState({});
  const [selectedInnerOptions, setSelectedInnerOptions] = useState({});
  const [selectedOuterMode, setSelectedOuterMode] = useState(null);

  const [selectedModesData, setSelectedModesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [transportType, setTransportType] = useState(null);

  const [newMarkerPosition, setNewMarkerPosition] = useState(null);
  const [markerPositions, setMarkerPositions] = useState({});
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [remainingDistance, setRemainingDistance] = useState(null);

  const startPoint = JSON.parse(sessionStorage.getItem("startPoint"));
  const endPoint = JSON.parse(sessionStorage.getItem("endPoint"));
  console.log("Start Point : ", startPoint);
  console.log("End Point : ", endPoint);

  const [hasMarker, setHasMarker] = useState({});

  // const storedTransportModes = JSON.parse(sessionStorage.getItem("DistributedTransportModes"));

  useEffect(() => {
    if (newMarkerPosition) {
      setMarkerPositions((prev) => ({
        ...prev,
        [transportType]: newMarkerPosition,
      }));
      sessionStorage.setItem(`newMarkerPosition_${transportType}`, JSON.stringify(newMarkerPosition));
      calculateDistance();
    }
  }, [newMarkerPosition]);

  const LocationMarker = ({ mode }) => {
    const map = useMap();
    useMapEvents({
      click(e) {
        if (isAddingMarker) {
          // Update the marker position for the current mode
          setMarkerPositions((prev) => ({
            ...prev,
            [mode]: e.latlng,
          }));
          sessionStorage.setItem(`newMarkerPosition_${mode}`, JSON.stringify(e.latlng));
          setNewMarkerPosition(e.latlng);
          setIsAddingMarker(false); // Exit marker mode after adding marker
          
        }
      },
    });


    return markerPositions[mode] ? (
      <Marker position={markerPositions[mode]} icon={middleIcon}>
        <Popup>{`${mode} Marker`}</Popup>
      </Marker>
    ) : null;
  };

  // const totalDistance = sessionStorage.getItem('distanceData');

  useEffect(() => {
    setSelectedMode(
      selectedTransportList.reduce((acc, id) => ({ ...acc, [id]: true }), {})
    );
  }, [selectedTransportList]);

  const handleSelect = (modeId) => {
    const modeDetails = modesOfTransport.find((item) => item.id === modeId);
    setTransportType(modeDetails.title);
    addToSelectedTransport(modeId);
    setSelectedOuterMode(modeId);

    if (modeDetails.children && modeDetails.children.length > 0) {
      setShowModal(true);
    } else {
      toggleModeSelection(modeId, modeDetails);
      setShowModal(true);
    }
  };

  const handleInnerOptionSelect = (innerOptionId) => {
    setSelectedInnerOptions((prev) => {
      const currentInnerOption = prev[selectedOuterMode];

      if (currentInnerOption === innerOptionId) {
        const newInnerOptions = { ...prev };
        delete newInnerOptions[selectedOuterMode];
        const modeDetails = modesOfTransport.find(
          (item) => item.id === selectedOuterMode
        );
        const remainingSelectedInnerOptions = Object.values(
          newInnerOptions
        ).filter((optionId) =>
          modeDetails.children.some((child) => child.id === optionId)
        );
        if (remainingSelectedInnerOptions.length === 0) {
          toggleModeSelection(selectedOuterMode, false);
        }

        return newInnerOptions;
      } else {
        const modeDetails = modesOfTransport.find(
          (item) => item.id === selectedOuterMode
        );
        const innerOption = modeDetails.children.find(
          (item) => item.id === innerOptionId
        );
        toggleModeSelection(selectedOuterMode, {
          ...modeDetails,
          title: innerOption.title,
        });

        return {
          ...prev,
          [selectedOuterMode]: innerOptionId,
        };
      }
    });
  };

  const toggleModeSelection = (modeId, modeDetails) => {
    if (!selectedMode[modeId]) {
      addToSelectedTransport(modeId);
      setSelectedModesData((prev) => [
        ...prev,
        {
          id: modeId,
          title: modeDetails.title
        },
      ]);
      setHasMarker(prev => ({...prev, [modeId]: true}));

    } else if (!modeDetails.children || modeDetails === false) {
      removeFromSelectedTransport(modeId);
      setSelectedModesData((prev) => prev.filter((item) => item.id !== modeId));
      setHasMarker(prev => ({...prev, [modeId]: false}));
    
    // Remove the marker for the deselected mode
    setMarkerPositions((prev) => {
        const newPositions = { ...prev };
        delete newPositions[modeDetails.title]; // Remove marker position
        // If it's a parent mode, remove any inner mode markers too
      if (modeDetails.children && modeDetails.children.length > 0) {
        modeDetails.children.forEach((child) => {
          delete newPositions[child.title];
        });
      }

        return newPositions;
      });

      
    
    }
  };

  useEffect(() => {
    setHasMarker(selectedModesData.reduce((acc, item) => ({...acc, [item.id]: true }), {}));
  }, [selectedModesData]);
  

  useEffect(() => {
    const modesData = selectedModesData.map((item) => ({
      id: item.id,
      title: item.title,
      distance: item.distance,
    }));
    sessionStorage.setItem("SelectedTransportModes", JSON.stringify(modesData));
  }, [selectedModesData]);

  useEffect(() => {
    sessionStorage.setItem(
      "SelectedTransportModes",
      JSON.stringify(selectedTransportList)
    );
  }, [selectedTransportList]);

  console.log("Selected Transport List : ", selectedTransportList.length);
  // console.log(storedTransportModes);
  

  const calculateDistance = () => {
    if (!endPoint) {
      console.log("End Point is missing to calculate distance.");
      return;
    }

    const endLatLng = L.latLng(endPoint.lat, endPoint.lng);
    const distances = Object.entries(markerPositions).map(([mode, position]) => {
      const markerLatLng = L.latLng(position.lat, position.lng);
      return markerLatLng.distanceTo(endLatLng) / 1000; // Convert to kilometers
    });

    const minDistance = Math.min(...distances);
    setRemainingDistance(minDistance);
    sessionStorage.setItem('remainingDistance', minDistance);
    console.log(`Remaining Distance to End Point: ${minDistance.toFixed(2)} km`);
  };

  const handleSetAsEntireDistance = () => {
    console.log("NewMarkerPosition before setting as entire distance:", newMarkerPosition);
    if (newMarkerPosition) {
      setNewMarkerPosition(endPoint); // Move marker to end point
      console.log("Marker set to end point:", endPoint);
      sessionStorage.setItem(
        "newMarkerPosition",
        JSON.stringify(endPoint)
      );
    } else {
      console.log("No marker position to set.");
    }
  };

  useEffect(() => {
    if (remainingDistance !== null) {
      console.log(`Remaining distance is: ${remainingDistance} km`);
    }
  }, [remainingDistance]);

  return (
    <div className={styles.tranportBox}>
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


      <div className={styles.modeOfTransportContent}>


        {showModal && startPoint && endPoint && (
          <ModalComponent
            buttonContent={transportType}
            children={
              <div className={styles.transportTypeModal}>
                <div className={styles.transportTypeOptions}>
                  {transportType === "Bus" ? (
                    <>
                      <h2>Transport Type</h2>
                      <div className={styles.transportTypesList}>
                        <ButtonComponent
                          className={`${styles.contentButton} ${selectedInnerOptions[selectedOuterMode] === "mot21"
                              ? styles.selected
                              : ""
                            }`}
                          onClick={() => handleInnerOptionSelect("mot21")}
                        >
                          EV Bus
                        </ButtonComponent>
                        <ButtonComponent
                          className={`${styles.contentButton} ${selectedInnerOptions[selectedOuterMode] === "mot22"
                              ? styles.selected
                              : ""
                            }`}
                          onClick={() => handleInnerOptionSelect("mot22")}
                        >
                          Normal Bus
                        </ButtonComponent>
                      </div>
                    </>
                  ) : transportType === "Auto" ? (
                    <>
                      <h2>Transport Type</h2>
                      <div className={styles.transportTypesList}>
                        <ButtonComponent
                          className={`${styles.contentButton} ${selectedInnerOptions[selectedOuterMode] === "mot11"
                              ? styles.selected
                              : ""
                            }`}
                          onClick={() => handleInnerOptionSelect("mot11")}
                        >
                          CNG Auto
                        </ButtonComponent>
                        <ButtonComponent
                          className={`${styles.contentButton} ${selectedInnerOptions[selectedOuterMode] === "mot12"
                              ? styles.selected
                              : ""
                            }`}
                          onClick={() => handleInnerOptionSelect("mot12")}
                        >
                          Petrol Auto
                        </ButtonComponent>
                      </div>
                    </>
                  ) : transportType === "Car" ? (
                    <>
                      <h2>Transport Type</h2>
                      <div className={styles.transportTypesList}>
                        <ButtonComponent
                          className={`${styles.contentButton} ${selectedInnerOptions[selectedOuterMode] === "mot31"
                              ? styles.selected
                              : ""
                            }`}
                          onClick={() => handleInnerOptionSelect("mot31")}
                        >
                          EV Car
                        </ButtonComponent>
                        <ButtonComponent
                          className={`${styles.contentButton} ${selectedInnerOptions[selectedOuterMode] === "mot32"
                              ? styles.selected
                              : ""
                            }`}
                          onClick={() => handleInnerOptionSelect("mot32")}
                        >
                          Petrol Car
                        </ButtonComponent>
                      </div>
                    </>
                  ) : null}
                </div>
                <div className={styles.transportMapContainer}>
                  <p>Map:</p>
                  <div className={styles.transportTypeModalButtons}>
                    <ButtonComponent onClick={() => setIsAddingMarker(true)}>
                      Add marker
                    </ButtonComponent>
                    <ButtonComponent onClick={handleSetAsEntireDistance}>
                      Set as Entire Distance
                    </ButtonComponent>
                  </div>

                  <div className={styles.distanceContainer}>
                    <MapContainer
                      center={[19.03642, 72.85947]}
                      zoom={13}
                      style={{ height: "100%", width: "80%", zIndex: 2 }}
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                      <Marker position={startPoint} icon={startIcon}>
                        <Popup>Start Point</Popup>
                      </Marker>

                      {Object.entries(markerPositions).map(([mode, position]) => (
                        <Marker key={mode} position={position} icon={middleIcon}>
                          <Popup>{`${mode} Marker`}</Popup> 
                        </Marker>
                      ))}


                      {/* New marker */}
                      <LocationMarker mode={transportType} />

                      <Marker position={endPoint} icon={endIcon}>
                        <Popup>End Point</Popup>
                      </Marker>

                      {/* <LocationMarker /> */}
                    </MapContainer>


                  </div>
                  {remainingDistance !== null && (
                    <p className={styles.remainingDistance}>
                      Remaining Distance: {remainingDistance.toFixed(2)} km
                    </p>
                  )}
                </div>
              </div>
            }
            buttonClassName={styles.transportTypeButton}
            open={showModal}
            onClose={() => setShowModal(false)}
            onOpen={() => setShowModal(true)}
          />
        )}
      </div>
    </div>
  );
};

export default Transport;
