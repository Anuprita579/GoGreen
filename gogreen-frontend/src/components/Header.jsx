import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom';
//useContext
import { useLoginState } from '../utils/LoginStateContext';
//Common Components
import PopoverComponent from '../commonComponents/PopoverComponent';
//MUI Components
//MUI ICONS
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
//Assets
import Logo from "../assets/gogreen_logo.png"
//Imports
import Menu from '../components/Menu';
import AfterSigninProfile from "./AfterSigninProfile";
import Signin from '../pages/CustomizePathway/Signin';
//Styles
import styles from "./styles.module.scss"
import ButtonComponent from '../commonComponents/ButtonComponent';
import { useSelector } from 'react-redux';

const Header = ({headerType}) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname); 
  const [hasScrolled, setHasScrolled] = useState(false);
  const { isLoggedIn } = useLoginState();

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  useEffect(()=>{
    const checkScrollTop = () => {
      if (window.scrollY > 500) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    // Add scroll event listener after component mounts
  window.addEventListener('scroll', checkScrollTop);
  return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const headerStyle = headerType === 'headerHome'? styles.headerOther :currentPath !== '/'? styles.headerOther : hasScrolled? styles.headerScrolled: styles.headerHome;

  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [anchorElSignin, setAnchorElSignin] = useState(null);
  const username = sessionStorage.getItem('name');
  

  const cartItems = useSelector(store => store.cart.items);

  const closePopover = (setter) => {
    setter(null)
  }

  const handleClickMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleClickSignin = (event) => {
    setAnchorElSignin(event.currentTarget);
  };

  return (
    <>
      <div className={`${styles.header} ${headerStyle}`}>
        <div className={styles.headerLeft}>
          {(currentPath!=='/' || headerStyle===styles.headerScrolled) && (
            <Link to="/">
            <img src={Logo} alt='logo' className={styles.logo} />
            </Link>
          )}
        </div>


        <div className={styles.headerRight}>
          <Link to="/bicycle">
            <ButtonComponent children={<><DirectionsBikeIcon /></>} className={styles.cartBtn}/>
          </Link>

          <Link to="/cart">
            <ButtonComponent children={<><ShoppingCartIcon /> {cartItems.length}</>} className={styles.cartBtn}/>
          </Link>

          <PopoverComponent
            anchorEl={anchorElMenu}
            handleClick={handleClickMenu}
            handleClose={()=>closePopover(setAnchorElMenu)}
            buttonContent={<MenuIcon className={styles.menuIcon} />} 
            popoverContent={<Menu onClose={()=>closePopover(setAnchorElMenu)} />} 
            buttonClassName={styles.menuIcon} 
            popoverClassName={styles.menuPopover} 
          />

          {isLoggedIn === false? (
            <PopoverComponent 
            anchorEl={anchorElSignin}
            handleClick={handleClickSignin}
            handleClose={()=>closePopover(setAnchorElSignin)}
            buttonContent="Sign In" 
            popoverContent={<Signin sourceComponent={'header'} onClose={()=>closePopover(setAnchorElSignin)}/>} 
            buttonClassName={styles.signinButton} 
            popoverClassName={styles.siginCornerPopover}
          />
          ):(
            <PopoverComponent 
            anchorEl={anchorElSignin}
            handleClick={handleClickSignin}
            handleClose={()=>closePopover(setAnchorElSignin)}
            buttonContent={<> <PersonIcon /> Hi {username} </>} 
            popoverContent={<AfterSigninProfile onClose={()=>closePopover(setAnchorElSignin)}/>} 
            buttonClassName={styles.signinButtonWithName} 
          />
          )}

        </div>

      </div>
    </>

  )
}

export default Header