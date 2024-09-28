import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
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

const Distance = () => {
  const { distanceData, setDistanceDataValue } = useActiveStep();
  console.log("distance Data : ", distanceData);
  sessionStorage.setItem("distanceData", distanceData);
  //   if (type === "start") {
  //     setStartPoint({ lat: e.target.getLatLng().lat, lng: e.target.getLatLng().lng });
  //   } else {
  //     setEndPoint({ lat: e.target.getLatLng().lat, lng: e.target.getLatLng().lng });
  //   }
  // };

  // const calculateDistance = (startPoint, endPoint) => {
  //   if (!startPoint || !endPoint) return "Please select both points.";

  //   // Haversine formula implementation
  //   const lat1 = startPoint.lat * Math.PI / 180;
  //   const lon1 = startPoint.lng * Math.PI / 180;
  //   const lat2 = endPoint.lat * Math.PI / 180;
  //   const lon2 = endPoint.lng * Math.PI / 180;

  //   const dlat = lat2 - lat1;
  //   const dlon = lon2 - lon1;
  //   const a =
  //     Math.sin(dlat / 2) ** 2 +
  //     Math.cos(lat1) *
  //       Math.cos(lat2) *
  //       Math.sin(dlon / 2) ** 2;
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   const earthRadius = 6371; // Radius of the Earth in kilometers

  //   const distance = earthRadius * c;

  //   return Math.round(distance * 1000) / 1000; // Convert kilometers to meters and round
  // };

  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [isSelectingStartPoint, setIsSelectingStartPoint] = useState(false);
  const [isSelectingEndPoint, setIsSelectingEndPoint] = useState(false);

  // Create custom icons for the markers
  const startIcon = L.icon({
    iconUrl: startMarkerImg,
    iconSize: [32, 32], // Adjust the size as per your image
    iconAnchor: [16, 32], // The anchor is the point of the icon which will correspond to the marker's location
    popupAnchor: [0, -32], // Popup position relative to the icon
  });

  const endIcon = L.icon({
    iconUrl: endMarkerImg,
    iconSize: [32, 32], // Adjust the size as per your image
    iconAnchor: [16, 32], // The anchor is the point of the icon which will correspond to the marker's location
    popupAnchor: [0, -32], // Popup position relative to the icon
  });

  // Automatically calculate the distance once both startPoint and endPoint are set
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
          } else if (type === "end") {
            setEndPoint({ lat, lng });
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

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        if (isSelectingStartPoint) {
          setStartPoint({ lat: e.latlng.lat, lng: e.latlng.lng });
          setIsSelectingStartPoint(false); // Stop selecting start point
        } else if (isSelectingEndPoint) {
          setEndPoint({ lat: e.latlng.lat, lng: e.latlng.lng });
          setIsSelectingEndPoint(false); // Stop selecting end point
        }
      },
    });
    return null;
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
    setEndPoint(null);
    setDistanceDataValue(""); // Clear stored distance
    setIsSelectingStartPoint(false);
    setIsSelectingEndPoint(false);
  };

  return (
    <div className={styles.distanceBox}>
      <div className={styles.distanceContainer}>
        <MapContainer
          center={[19.03642, 72.85947]}
          zoom={13}
          style={{ height: "100%", width: "80%", zIndex: 2 }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {startPoint && (
            <Marker position={startPoint} icon={startIcon}>
              <Popup>Start Point</Popup>
            </Marker>
          )}
          {endPoint && (
            <Marker position={endPoint} icon={endIcon}>
              <Popup>End Point</Popup>
            </Marker>
          )}
          <LocationMarker />
        </MapContainer>
      </div>

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
