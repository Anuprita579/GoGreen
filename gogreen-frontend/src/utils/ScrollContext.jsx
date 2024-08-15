import React, { createContext, useContext, useRef } from 'react';

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const footerRef = useRef(null);
  const pathwayRef = useRef(null);
  const publicPrivateRef = useRef(null);
  const universityRef = useRef(null);
  const corporateRef = useRef(null);

  const scrollToFooter = () => {
    footerRef.current.scrollIntoView({ behavior: 'auto' });
  };
  const scrollToChoosePathway = () => {
    pathwayRef.current.scrollIntoView({ behavior: 'auto' });
  };
  const scrollToPublicPrivatePartners = () => {
    publicPrivateRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
    window.scrollBy(0, -150);
  };
  const scrollToUniversityPartners = () => {
    universityRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
    window.scrollBy(0, -150);

  };
  const scrollToCorporatePartners = () => {
    corporateRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
    window.scrollBy(0, -150);

  };

  return (
    <ScrollContext.Provider value={{ footerRef, scrollToFooter, pathwayRef, scrollToChoosePathway, publicPrivateRef, scrollToPublicPrivatePartners, universityRef, scrollToUniversityPartners, corporateRef, scrollToCorporatePartners }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);