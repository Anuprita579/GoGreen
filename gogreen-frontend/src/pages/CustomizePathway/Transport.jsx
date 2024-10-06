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
import { useTransportModes } from "./useTransportModes";
import { modesOfTransport } from "../../constants/transport";
//Common Components
import ButtonComponent from "../../commonComponents/ButtonComponent";
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

  // const { selectedModesData, selectedInnerOptions, handleModeSelect, setSelectedInnerOptions } = useTransportModes();
  const [selectedMode, setSelectedMode] = useState({});
  const [selectedInnerOptions, setSelectedInnerOptions] = useState(null);
  const [selectedOuterMode, setSelectedOuterMode] = useState(null);

  const [selectedModesData, setSelectedModesData] = useState({});
  const [showModal, setShowModal] = useState(false);

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
  console.log("Marker Positions : ", markerPositions);
  console.log("New Marker Positions : ", newMarkerPosition);

  useEffect(() => {
    if (newMarkerPosition && showModal) {
      setMarkerPositions((prev) => ({
        ...prev,
        [showModal?.transportType]: newMarkerPosition,
      }));
      sessionStorage.setItem(
        `newMarkerPosition_${showModal?.transportType}`,
        JSON.stringify(newMarkerPosition)
      );
      calculateDistance(showModal?.transportType);
    }
  }, [newMarkerPosition]);

  const LocationMarker = ({ mode }) => {
    console.log({ modeInfo: mode });
    useMapEvents({
      click(e) {
        if (isAddingMarker) {
          setMarkerPositions((prev) => ({
            ...prev,
            [mode]: e.latlng,
          }));
          sessionStorage.setItem(
            `newMarkerPosition_${mode}`,
            JSON.stringify(e.latlng)
          );
          setNewMarkerPosition(e.latlng);

          addToSelectedTransport(modesOfTransport[mode].id);
          setSelectedOuterMode(modesOfTransport[mode].id);
          toggleModeSelection(modesOfTransport[mode]);
          setIsAddingMarker(false);
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

  const handleSelect = (modeTitle) => {
    setShowModal({ transportType: modeTitle });
    setSelectedModesData((prev) => ({
      ...prev,
      [modeTitle]: {
        id: modesOfTransport[modeTitle].id,
        title: modeTitle,
        distance: 0,
        innerOption: null,
      },
    }));

    

    if (
      Object.keys(modesOfTransport[modeTitle]?.children || {})?.length &&
      !selectedInnerOptions
    ) {
      // setSelectedInnerOptions(selectedModesData[modeTitle]?.innerOptionId?selectedModesData[modeTitle]?.innerOptionId:modesOfTransport[modeTitle]?.children[0]?.id);
      setSelectedInnerOptions(
        selectedModesData[modeTitle]?.innerOptionId
          ? selectedModesData[modeTitle]?.innerOptionId
          : Object.keys(modesOfTransport[modeTitle]?.children)[0]
      );
    }
  };

  console.log("seletedInnerOptions is :", selectedInnerOptions);

  const handleInnerOptionSelect = (innerOption) => {
    console.log("Inner Option :", innerOption);
    setSelectedInnerOptions(innerOption?.id);
  };

  const toggleModeSelection = (modeDetails) => {
    if (!selectedMode[modeDetails.id]) {
      addToSelectedTransport(modeDetails.id);
      setHasMarker((prev) => ({ ...prev, [modeDetails.id]: true }));
    }
  };

  useEffect(() => {
    setHasMarker(
      Object.values(selectedModesData).reduce(
        (acc, item) => ({ ...acc, [item.id]: true }),
        {}
      )
    );
    console.log("SelectedModes Data is : ", selectedModesData);

    console.log("Selected inner options in useEffect :", selectedInnerOptions);
    sessionStorage.setItem(
      "SelectedTransportModes",
      JSON.stringify(selectedModesData)
    );
  }, [selectedModesData, selectedInnerOptions]);

  const calculateDistance = (transportType) => {
    if (!endPoint) {
      console.log("End Point is missing to calculate distance.");
      return;
    }

    const endLatLng = L.latLng(endPoint.lat, endPoint.lng);
    const modeKeys = Object.keys(markerPositions);
    const distances = {};

    for (let i = 0; i < modeKeys.length; i++) {
      const mode = modeKeys[i];
      if (mode === transportType) {
        const markerLatLng = L.latLng(
          markerPositions[mode].lat,
          markerPositions[mode].lng
        );
        let distance;

        if (i === 0) {
          distance = calculateModeDistance(
            startPoint.lat,
            startPoint.lng,
            markerLatLng.lat,
            markerLatLng.lng
          );
        } else {
          const prevMode = modeKeys[i - 1];
          const prevMarkerLatLng = L.latLng(
            markerPositions[prevMode].lat,
            markerPositions[prevMode].lng
          );
          distance = calculateModeDistance(
            prevMarkerLatLng.lat,
            prevMarkerLatLng.lng,
            markerLatLng.lat,
            markerLatLng.lng
          );
        }

        if (distance !== undefined) {
          const updatedModeData = {
            id: modesOfTransport[mode].id,
            title: mode,
            distance: distance.toFixed(2),
            innerOption: modesOfTransport[mode]?.children?.[selectedInnerOptions]?.title,
          };

          setSelectedModesData((prev) => {
            const filteredData = prev;
            filteredData[mode] = updatedModeData;
            return filteredData;
          });
        }
      }
    }

    const lastMarkerLatLng = L.latLng(
      markerPositions[modeKeys[modeKeys.length - 1]].lat,
      markerPositions[modeKeys[modeKeys.length - 1]].lng
    );
    const finalDistance = calculateModeDistance(
      lastMarkerLatLng.lat,
      lastMarkerLatLng.lng,
      endPoint.lat,
      endPoint.lng
    );
    distances.remainingDistance = finalDistance.toFixed(2);
    setRemainingDistance(finalDistance);
    sessionStorage.setItem("remainingDistance", finalDistance);
    sessionStorage.setItem("calculatedDistances", JSON.stringify(distances));
    console.log("Distances for each transportType:", distances);
    console.log("Remaining Distance to End Point:", finalDistance.toFixed(2));
  };

  const calculateModeDistance = (
    sourceLat,
    sourceLng,
    destinationLat,
    destinationLng
  ) => {
    const sourceLatLng = L.latLng(sourceLat, sourceLng);
    const destinationLatLng = L.latLng(destinationLat, destinationLng);
    const distance = sourceLatLng.distanceTo(destinationLatLng) / 1000; // Convert to kilometers
    return distance;
  };

  const handleSetAsEntireDistance = (mode) => {
    console.log(
      "NewMarkerPosition before setting as entire distance:",
      newMarkerPosition
    );
    if (newMarkerPosition) {
      setNewMarkerPosition(endPoint); // Move marker to end point
      console.log("Marker set to end point:", endPoint);
      sessionStorage.setItem("newMarkerPosition", JSON.stringify(endPoint));

      console.log(
        "Mode of transport in Handle Set as Entire distance :",
        modesOfTransport[mode]
      );

      addToSelectedTransport(modesOfTransport[mode]?.id);
      setSelectedOuterMode(modesOfTransport[mode]?.id);
      toggleModeSelection(modesOfTransport[mode]);
    } else {
      console.log("No marker position to set.");
    }
  };

  const removeMarker = (mode) => {
    setMarkerPositions((prev) => {
      const newState = { ...prev };
      delete newState[mode];
      return newState;
    });
    setNewMarkerPosition(null);
    sessionStorage.removeItem(`newMarkerPosition_${mode}`);
    setSelectedOuterMode(null);
    removeFromSelectedTransport(modesOfTransport[mode]?.id);
  };

  useEffect(() => {
    if (remainingDistance !== null) {
      console.log(`Remaining distance is: ${remainingDistance} km`);
    }
  }, [remainingDistance]);

  return (
    <div className={styles.tranportBox}>
      <div className={styles.transportCard}>
        {Object.values(modesOfTransport).map((item) => {
          return (
            <ModesofTransportCard
              id={item?.id}
              img_src={item?.img_src}
              title={item?.title}
              selected={selectedMode[item.id]}
              onSelect={() => handleSelect(item.title)}
              key={item.id}
            />
          );
        })}
      </div>

      <div className={styles.modeOfTransportContent}>
        {showModal && startPoint && endPoint && (
          <ModalComponent
            buttonContent={showModal?.transportType}
            children={
              <div className={styles.transportTypeModal}>
                <div className={styles.transportTypeOptions}>
                  {console.log({
                    modesOfTransport,
                    "showModal.transportType": showModal.transportType,
                  })}
                  {Object.values(
                    modesOfTransport[showModal?.transportType]?.children || {}
                  ).length > 0 ? (
                    <>
                      <h2>Transport Type</h2>

                      <div className={styles.transportTypesList}>
                        {Object.values(
                          modesOfTransport[showModal?.transportType]?.children
                        ).map((transport) => (
                          <ButtonComponent
                            className={`${styles.contentButton} ${
                              selectedInnerOptions === transport.id
                                ? styles.selected
                                : ""
                            }`}
                            onClick={() => handleInnerOptionSelect(transport)}
                          >
                            {transport.title}
                          </ButtonComponent>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
                <div className={styles.transportMapContainer}>
                  <p>Map:</p>
                  <div className={styles.transportTypeModalButtons}>
                    <ButtonComponent
                      onClick={() => setIsAddingMarker(true)}
                      children="Add marker"
                    />
                    <ButtonComponent
                      onClick={() =>
                        handleSetAsEntireDistance(showModal.transportType)
                      }
                      children="Set as entire distance"
                    />
                    <ButtonComponent
                      onClick={() => removeMarker(showModal.transportType)}
                      children="Remove Marker"
                    />
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

                      {Object.entries(markerPositions).map(
                        ([mode, position]) => (
                          <Marker
                            key={mode}
                            position={position}
                            icon={middleIcon}
                          >
                            <Popup>{`${mode} Marker`}</Popup>
                          </Marker>
                        )
                      )}

                      {/* New marker */}
                      <LocationMarker mode={showModal?.transportType} />

                      <Marker position={endPoint} icon={endIcon}>
                        <Popup>End Point</Popup>
                      </Marker>
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
            onClose={() => {
              setShowModal(false);
              setSelectedInnerOptions(null);
            }}
            onOpen={() => setShowModal(true)}
          />
        )}
      </div>
    </div>
  );
};

export default Transport;
