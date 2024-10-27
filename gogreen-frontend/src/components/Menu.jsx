import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
//Common Components
import ButtonComponent from '../commonComponents/ButtonComponent';
//MUI ICONS
import CloseIcon from '@mui/icons-material/Close';
//Imports
import styles from "./styles.module.scss"

const Menu = ({onClose}) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [prevPath, setPrevPath] = useState(location.pathname);
  console.log("Location pathname : ", location.pathname);

  useEffect(() => {
    if (currentPath !== location.pathname) {
      onClose();
      setPrevPath(location.pathname);
    }
    setCurrentPath(location.pathname);
  }, [location]);

  const handleCloseMenu = () => {
    onClose();
  }
  return (
    <>
        <div className={styles.menu}>
          <div className={styles.leftSection}>
            <nav>
              <ul>
                <Link to='/' onClick={handleCloseMenu}><li>Home</li></Link>
                <Link to='/about' onClick={handleCloseMenu}><li>About Us</li></Link>
                <Link to='/calculate' onClick={handleCloseMenu}><li>Carbon Footprint Calculator</li></Link>
                <Link to='/education' onClick={handleCloseMenu}><li>Education</li></Link>
                <Link to='/store' onClick={handleCloseMenu}><li>Shopping</li></Link>
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