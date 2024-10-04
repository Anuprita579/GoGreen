// ActiveStepContext.js
import React, { createContext, useContext, useState } from 'react';

const ActiveStepContext = createContext();

export const useActiveStep = () => useContext(ActiveStepContext);

export const ActiveStepProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [distanceData, setDistanceData] = useState("");
  const [selectedTransport, setSelectedTransport] = useState({});
  const [selectedTransportList, setSelectedTransportList] = useState([]);
  // const [dataAvailable, setDataAvailable] = useState(null);

  const incrementStep = () => setActiveStep((prevStep) => prevStep + 1);
  const decrementStep = () => setActiveStep((prevStep) => prevStep - 1);
  const resetStep = () => setActiveStep(0);

  const canAdvanceToNextStep = () => {
    switch(activeStep){
      case 1: 
        return distanceData !== "";
      case 2:
        return selectedTransportList.length >0 && sessionStorage.getItem('remainingDistance')==="0";
      default: 
        return true;
    }
  }

  const setDistanceDataValue = (value) => setDistanceData(value);
  const selectTransport = (transId) => setSelectedTransport(transId);

  // const addToSelectedTransport =(transport)=>{
  //   setSelectedTransportList((prevTrans)=>[...prevTrans, transport]);
  // }
  const addToSelectedTransport = (transportId) => {
    setSelectedTransport(prev => ({ ...prev, [transportId]: !prev[transportId] }));
    setSelectedTransportList(prev => [...new Set([...prev, transportId])]);
  };

  const removeFromSelectedTransport = (transportId) => {
    setSelectedTransport(prev => ({ ...prev, [transportId]: false }));
    setSelectedTransportList(prev => prev.filter(id => id !== transportId));
  };


  return (
    <ActiveStepContext.Provider value={{ activeStep, setActiveStep, incrementStep, decrementStep, resetStep, distanceData, canAdvanceToNextStep, setDistanceDataValue, addToSelectedTransport, removeFromSelectedTransport, selectedTransportList, setSelectedTransportList, selectTransport, }}>
      {children}
    </ActiveStepContext.Provider>
  );
};