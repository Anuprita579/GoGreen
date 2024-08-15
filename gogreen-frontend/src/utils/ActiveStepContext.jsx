// ActiveStepContext.js
import React, { createContext, useContext, useState } from 'react';

const ActiveStepContext = createContext();

export const useActiveStep = () => useContext(ActiveStepContext);

export const ActiveStepProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDegree, setSelectedDegree] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedJob, setSelectedJob] = useState([]);
  const [selectedJobList, setSelectedJobList] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(null);

  const incrementStep = () => setActiveStep((prevStep) => prevStep + 1);
  const decrementStep = () => setActiveStep((prevStep) => prevStep - 1);
  const resetStep = () => setActiveStep(0);

  const canAdvanceToNextStep = () => {
    switch(activeStep){
      case 1: 
        return selectedDegree !==null;
      case 2:
        return selectedUniversity !==null;
      case 3:
        return selectedLocation !==null;
      case 4:
        return selectedJob.length >0;
      default: 
        return true;
    }
  }
  const updateDataAvailability = (available) => {
    setDataAvailable(available);
  };

  const selectDegree = (degreeId) => setSelectedDegree(degreeId);
  const selectUniversity = (universityId) => setSelectedUniversity(universityId);
  const selectLocation = (locationId, locationName) => setSelectedLocation({id: locationId, name: locationName});
  const selectJob = (jobId) => setSelectedJob(jobId);

  const addToSelectedJobs =(job)=>{
    setSelectedJobList((prevJobs)=>[...prevJobs, job]);
  }

  return (
    <ActiveStepContext.Provider value={{ activeStep, setActiveStep, incrementStep, decrementStep, resetStep, selectDegree, selectUniversity, selectLocation, selectJob, selectedDegree, selectedUniversity, selectedLocation, selectedJob, canAdvanceToNextStep, setSelectedDegree, setSelectedUniversity, setSelectedLocation, setSelectedJob, addToSelectedJobs, selectedJobList, setSelectedJobList, updateDataAvailability, dataAvailable }}>
      {children}
    </ActiveStepContext.Provider>
  );
};