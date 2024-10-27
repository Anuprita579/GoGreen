import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
//Assets
import endMarkerImg from "../../assets/endMarkerImg.png";
import startMarkerImg from "../../assets/startMarkerImg.png";
import middleMarkerImg from "../../assets/middleMarkerImg.png";
//Import
import LocationMarker from './LocationMarker';
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

const MapComponent = ({ 
    startPoint,
    endPoint,
    setStartPoint,
    setEndPoint,
    isSelectingStartPoint,
    setIsSelectingStartPoint,
    isSelectingEndPoint,
    setIsSelectingEndPoint }) => {          
  return (
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
          <LocationMarker 
              setStartPoint={setStartPoint}
              setEndPoint={setEndPoint}
              isSelectingStartPoint={isSelectingStartPoint}
              setIsSelectingStartPoint={setIsSelectingStartPoint}
              isSelectingEndPoint={isSelectingEndPoint}
              setIsSelectingEndPoint={setIsSelectingEndPoint}
          />
        </MapContainer>
      </div>
  )
}

export default MapComponent
