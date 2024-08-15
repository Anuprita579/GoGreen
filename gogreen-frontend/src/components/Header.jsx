import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom';
//useContext
import { useLoginState } from '../utils/LoginStateContext';
//Common Components
import Button from "../commonComponents/ButtonComponent"
import PopoverComponent from '../commonComponents/PopoverComponent';
//MUI Components
//MUI ICONS
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
//Assets
// import Logo from "../assets/digavarsity_logo.png"
//Imports
import Menu from '../components/Menu';
import Searchbox from './Searchbox';
import AfterSigninProfile from "./AfterSigninProfile";
import Signin from '../pages/CustomizePathway/Signin';

const Header = ({headerType}) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname); 
  const [hasScrolled, setHasScrolled] = useState(false);
  const { isLoggedIn, userInfo, login, logout } = useLoginState();

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

  const headerStyle = headerType === 'header-home'? 'header-other' :currentPath !== '/'? ' header-other' : hasScrolled? 'header-scrolled': 'header-home';


  const [displaySearchBox, setDisplaySearchBox] = useState(false);
  const [displaySearchIcon, setDisplaySearchIcon] = useState(true);
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [anchorElSignin, setAnchorElSignin] = useState(null);
  const username = sessionStorage.getItem('name');
  // const isUserLogin = sessionStorage.getItem('signInCompleted');
  
  // const isUserLogin = null;
  console.log("User Login in Header Layout : ", isLoggedIn);


  const handleDisplaySearch = () => {
    if (displaySearchBox === false) {
      setDisplaySearchBox(true);
      setDisplaySearchIcon(false);
    }
    else {
      setDisplaySearchBox(false);
      setDisplaySearchIcon(true);
    }
  }
  const handleClose = () => {
    setDisplaySearchBox(false);
    setDisplaySearchIcon(true);
  }

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
      <div className={`header ${headerStyle}`}>
        <div className='header-left'>
          {/* <img src={Logo} alt='logo' className='logo' /> */}
          {/* {headerType!=='home' && <img src={Logo} alt='logo' className='logo' />} */}
          {(currentPath!=='/' || headerStyle==='header-scrolled') && (
            <Link to="/">
            {/* <img src={Logo} alt='logo' className='logo' /> */}
            </Link>
          )}
        </div>

        {/* {displaySearchBox ? (
          <div className='search-box-display'><Searchbox onClose={handleClose} /></div>
        ) : null} */}

        <div className='header-right'>

          {/* <Button className={"language-icon language-select-mobile"}><GTranslateIcon /></Button>

          <LanguageSelect /> */}

          {/* {displaySearchIcon ? (
            <Button onClick={handleDisplaySearch} ><SearchIcon className='search-icon' /></Button>
          ) : null} */}
          <PopoverComponent
            anchorEl={anchorElMenu}
            handleClick={handleClickMenu}
            handleClose={()=>closePopover(setAnchorElMenu)}
            buttonContent={<MenuIcon className='menu-icon' />} 
            popoverContent={<Menu onClose={()=>closePopover(setAnchorElMenu)} />} 
            buttonClassName={'menu-icon'} 
            popoverClassName={'menu-popover'} 
          />


          {/* <PopoverComponent 
            anchorEl={anchorElSignin}
            handleClick={handleClickSignin}
            handleClose={()=>closePopover(setAnchorElSignin)}
            buttonContent="Sign In" 
            popoverContent={<AfterSigninProfile onClose={()=>closePopover(setAnchorElSignin)}/>} 
            buttonClassName={'signin-button'} 
          /> */}

          {isLoggedIn === false? (
            <PopoverComponent 
            anchorEl={anchorElSignin}
            handleClick={handleClickSignin}
            handleClose={()=>closePopover(setAnchorElSignin)}
            buttonContent="Sign In" 
            // popoverContent={<div>Signin Component</div>}
            popoverContent={<Signin sourceComponent={'header'} onClose={()=>closePopover(setAnchorElSignin)}/>} 
            buttonClassName={'signin-button'} 
            popoverClassName={'sigin-corner-popover'}
          />
          ):(
            <PopoverComponent 
            anchorEl={anchorElSignin}
            handleClick={handleClickSignin}
            handleClose={()=>closePopover(setAnchorElSignin)}
            buttonContent={<> <PersonIcon /> Hi {username} </>} 
            popoverContent={<AfterSigninProfile onClose={()=>closePopover(setAnchorElSignin)}/>} 
            buttonClassName={'signin-button-with-name'} 
          />
          )}

        </div>

      </div>
    </>

  )
}

export default Header