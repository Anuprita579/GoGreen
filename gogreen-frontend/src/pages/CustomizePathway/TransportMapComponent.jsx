import React from 'react'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
//Assets
import endMarkerImg from "../../assets/endMarkerImg.png";
import startMarkerImg from "../../assets/startMarkerImg.png";
import middleMarkerImg from "../../assets/middleMarkerImg.png";
//Imports
import TransportLocationMarker from './TransportLocationMarker';
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


const TransportMapComponent = ({ startPoint, endPoint, showModal, markerPositions, isAddingMarker, setIsAddingMarker, setMarkerPositions, setNewMarkerPosition, addToSelectedTransport, modesOfTransport, setSelectedOuterMode, toggleModeSelection }) => {

    return (
        <div className={styles.distanceContainer}>
            <MapContainer
                center={[19.03642, 72.85947]}
                zoom={13}
                style={{ height: "100%", width: "100%", zIndex: 2 }}
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
                <TransportLocationMarker
                    mode={showModal?.transportType}
                    markerPositions={markerPositions}
                    isAddingMarker={isAddingMarker}
                    setIsAddingMarker={setIsAddingMarker}
                    setMarkerPositions={setMarkerPositions}
                    setNewMarkerPosition={setNewMarkerPosition}
                    addToSelectedTransport={addToSelectedTransport}
                    modesOfTransport={modesOfTransport}
                    setSelectedOuterMode={setSelectedOuterMode}
                    toggleModeSelection={toggleModeSelection}

                />

                <Marker position={endPoint} icon={endIcon}>
                    <Popup>End Point</Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default TransportMapComponent
