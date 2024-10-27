import React from 'react'
import { useMapEvents } from "react-leaflet";

const LocationMarker = ({    
    setStartPoint,
    setEndPoint,
    isSelectingStartPoint,
    setIsSelectingStartPoint,
    isSelectingEndPoint,
    setIsSelectingEndPoint}) => {
    useMapEvents({
      click(e) {
        if (isSelectingStartPoint) {
          setStartPoint({ lat: e.latlng.lat, lng: e.latlng.lng });
          sessionStorage.setItem("startPoint", JSON.stringify({ lat: e.latlng.lat, lng: e.latlng.lng }));
          setIsSelectingStartPoint(false); // Stop selecting start point
        } else if (isSelectingEndPoint) {
          setEndPoint({ lat: e.latlng.lat, lng: e.latlng.lng });
          sessionStorage.setItem("endPoint", JSON.stringify({ lat: e.latlng.lat, lng: e.latlng.lng }));
          setIsSelectingEndPoint(false); // Stop selecting end point
        }
      },
    });
    return null;
  };

export default LocationMarker
