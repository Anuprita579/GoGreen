import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
//useContext
import { useLoginState } from '../utils/LoginStateContext';
//API URL
// import { InitiateAssessmentAPI } from '../../utils/apiUrl';
// import callAPI from '../../utils/apiAction';
//Common Components
import ButtonComponent from '../commonComponents/ButtonComponent';
import ModalComponent from '../commonComponents/ModalComponent';
//MUI ICONS
import CloseIcon from '@mui/icons-material/Close';
//Imports
import Signin from '../pages/CustomizePathway/Signin';
import styles from "./styles.module.scss"

const Menu = ({onClose}) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [prevPath, setPrevPath] = useState(location.pathname);
  console.log("Location pathname : ", location.pathname); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => {
    setIsModalOpen(true);
  }
  const handleClose = () => setIsModalOpen(false);
  const queryParams = {
    mobileNo: sessionStorage.getItem('mobileNo')
  };

  useEffect(() => {
    if (currentPath !== location.pathname) {
      onClose();
      setPrevPath(location.pathname);
    }
    setCurrentPath(location.pathname);
  }, [location]);

  const handleCloseMenu = () => {
    // setDisplayMenu(false);
    onClose();
  }
  return (
    <>
        <div className={styles.menu}>
          <div className={styles.leftSection}>
            <nav>
              <ul>
                <Link to='/' onClick={handleCloseMenu}><li>Home</li></Link>
                <Link to='about' onClick={handleCloseMenu}><li>About Us</li></Link>
                <Link to='work-integrated-programs' onClick={handleCloseMenu}><li>Carbon Footprint Calculator</li></Link>
                <Link to='/eco-system' onClick={handleCloseMenu}><li>Education</li></Link>
                <Link to='/contact-us' onClick={handleCloseMenu}><li>Contact Us</li></Link>
                <Link to='/faq' onClick={handleCloseMenu}><li>FAQs</li></Link>
              </ul>
            </nav>
          </div>
          <div className={styles.rightSection}>
            <ButtonComponent onClick={handleCloseMenu}> <CloseIcon /> </ButtonComponent>
          </div>
        </div>
      
    </>
  )
}

export default Menu