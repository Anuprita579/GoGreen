import React from "react";
import {
    Marker,
    Popup,
    useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
//Assets
import middleMarkerImg from "../../assets/middleMarkerImg.png";

const middleIcon = L.icon({
    iconUrl: middleMarkerImg,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const TransportLocationMarker = ({ mode, markerPositions, isAddingMarker, setIsAddingMarker, setMarkerPositions, setNewMarkerPosition, addToSelectedTransport, modesOfTransport, setSelectedOuterMode, toggleModeSelection }) => {
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

export default TransportLocationMarker