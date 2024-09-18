import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActiveStep } from './ActiveStepContext';

const LoginStateContext = createContext();

export const useLoginState = () => useContext(LoginStateContext);

export const LoginStateProvider = ({ children }) => {
  const navigate = useNavigate();
  const { setActiveStep, setDistanceDataValue, setSelectedTransportList } = useActiveStep();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const resetFields = () => {
    setDistanceDataValue("");
    setSelectedTransportList([]);
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
    sessionStorage.clear();
    setShouldNavigate(true); 
    setActiveStep(0);
    setDistanceDataValue("");
    setSelectedTransportList([]);
    resetFields();
  };

  return (
    <LoginStateContext.Provider value={{ 
      isLoggedIn, 
      userInfo, 
      login, 
      logout, 
      resetFields,
    }}>
      {children}
    </LoginStateContext.Provider>
  );
};