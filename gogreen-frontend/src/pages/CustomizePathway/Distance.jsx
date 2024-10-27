import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
//useContext
import { useActiveStep } from "../../utils/ActiveStepContext";
//Common Components
import ButtonComponent from "../../commonComponents/ButtonComponent";
//Assets
import endMarkerImg from "../../assets/endMarkerImg.png";
import startMarkerImg from "../../assets/startMarkerImg.png";
//Import
import styles from "./styles.module.scss";
import MapComponent from "./MapComponent";

const Distance = () => {
  const { distanceData, setDistanceDataValue } = useActiveStep();
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [isSelectingStartPoint, setIsSelectingStartPoint] = useState(false);
  const [isSelectingEndPoint, setIsSelectingEndPoint] = useState(false);
  sessionStorage.setItem("distanceData", distanceData);

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

  useEffect(() => {
    if (startPoint && endPoint) {
      const distance = calculateDistance(startPoint, endPoint);
      setDistanceDataValue(distance);
    }
  }, [startPoint, endPoint]);

  const handleLocationClick = (type) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          if (type === "start") {
            setStartPoint({ lat, lng });
            sessionStorage.setItem("startPoint", JSON.stringify({ lat, lng }));
          } else if (type === "end") {
            setEndPoint({ lat, lng });
            sessionStorage.setItem("endPoint", JSON.stringify({ lat, lng }));
          }
        },
        (error) => {
          console.error("Error detecting location: ", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const calculateDistance = (startPoint, endPoint) => {
    const lat1 = (startPoint.lat * Math.PI) / 180;
    const lon1 = (startPoint.lng * Math.PI) / 180;
    const lat2 = (endPoint.lat * Math.PI) / 180;
    const lon2 = (endPoint.lng * Math.PI) / 180;

    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;
    const a =
      Math.sin(dlat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const earthRadius = 6371;

    const distance = earthRadius * c;
    return Math.round(distance * 1000) / 1000; // Rounds to 3 decimal places
  };

  const handleRestart = () => {
    setStartPoint(null);
    sessionStorage.setItem("startPoint", null);
    setEndPoint(null);
    sessionStorage.setItem("endPoint", null);
    setDistanceDataValue(""); // Clear stored distance
    setIsSelectingStartPoint(false);
    setIsSelectingEndPoint(false);
  };

  return (
    <div className={styles.distanceBox}>
      <MapComponent 
        startPoint={startPoint}
        endPoint={endPoint}
        setStartPoint={setStartPoint}
        setEndPoint={setEndPoint}
        isSelectingStartPoint={isSelectingStartPoint}
        setIsSelectingStartPoint={setIsSelectingStartPoint}
        isSelectingEndPoint={isSelectingEndPoint}
        setIsSelectingEndPoint={setIsSelectingEndPoint}
      />

      <div className={styles.mapFeatureButtons}>
        <ButtonComponent onClick={() => setIsSelectingStartPoint(true)} className={styles.startDistanceButton} children="Select Start Point" />
        <ButtonComponent onClick={() => setIsSelectingEndPoint(true)} disabled={!startPoint} className={styles.endDistanceButton} children="Select End Point" />
        <ButtonComponent onClick={handleRestart} className={styles.restartButton} children="Restart" />
        <ButtonComponent onClick={() => handleLocationClick("start")} className={styles.detectStartLocationButton} children="Detect Location (Set as Start)" />
        <ButtonComponent onClick={() => handleLocationClick("end")} disabled={!startPoint} className={styles.detectEndLocationButton} children="Detect Location (Set as End)" />
      </div>

      <p className={styles.distanceInfo}>
        <span className={styles.distanceTitle}> Distance :  </span>
        {distanceData ? `${distanceData} km` : "Select points to calculate"}
      </p>
    </div>
  );
};

export default Distance;