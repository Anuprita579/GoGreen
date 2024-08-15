import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActiveStep } from './ActiveStepContext';

const LoginStateContext = createContext();

export const useLoginState = () => useContext(LoginStateContext);

export const LoginStateProvider = ({ children }) => {
  const navigate = useNavigate();
  const { setActiveStep, setSelectedDegree, setSelectedUniversity, setSelectedLocation, setSelectedJob } = useActiveStep();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const [selectedQualification, setSelectedQualification] = useState(
    JSON.parse(sessionStorage.getItem('selectedQualification')) || null
  );
  const [selectedIndustry, setSelectedIndustry] = useState(
    JSON.parse(sessionStorage.getItem('selectedIndustry')) || null
  );
  const [selectedRole, setSelectedRole] = useState(
    JSON.parse(sessionStorage.getItem('selectedRole')) || null
  );

  const resetFields = () => {
    setSelectedRole(null);
    setSelectedQualification(null);
    setSelectedIndustry(null);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedUser = sessionStorage.getItem('userInfo');
    return savedUser ? true : false;
  });

  const [userInfo, setUserInfo] = useState(() => {
    const savedUser = sessionStorage.getItem('userInfo');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (isLoggedIn) {
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      sessionStorage.removeItem('userInfo');
    }
  }, [isLoggedIn, userInfo]);

  useEffect(() => {
    sessionStorage.setItem('selectedQualification', JSON.stringify(selectedQualification));
  }, [selectedQualification]);

  useEffect(() => {
    sessionStorage.setItem('selectedIndustry', JSON.stringify(selectedIndustry));
  }, [selectedIndustry]);

  useEffect(() => {
    sessionStorage.setItem('selectedRole', JSON.stringify(selectedRole));
  }, [selectedRole]);

  useEffect(() => {
    if (shouldNavigate && !isLoggedIn) {
      navigate("/");
      setShouldNavigate(false); 
    }
  }, [shouldNavigate, isLoggedIn, navigate]);

  const login = (user) => {
    setIsLoggedIn(true);
    setUserInfo(user);
  };


  const logout = () => {
    navigate("/");
    setIsLoggedIn(false);
    setUserInfo(null);
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('selectedQualification');
    sessionStorage.removeItem('selectedIndustry');
    sessionStorage.removeItem('selectedRole');
    sessionStorage.clear();
    setShouldNavigate(true); 
    setActiveStep(0);
    setSelectedDegree(null);
    setSelectedUniversity(null);
    setSelectedLocation(null);
    setSelectedJob([]);
    resetFields();
  };

  return (
    <LoginStateContext.Provider value={{ 
      isLoggedIn, 
      userInfo, 
      login, 
      logout, 
      resetFields, 
      selectedQualification, 
      selectedIndustry, 
      selectedRole, 
      setSelectedQualification, 
      setSelectedIndustry, 
      setSelectedRole 
    }}>
      {children}
    </LoginStateContext.Provider>
  );
};