import React, { useState } from 'react'
//Common Components
import ButtonComponent from '../commonComponents/ButtonComponent';
//MUI ICONS
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const Searchbox = ({onClose}) => {
    const [searchText, setSearchText] = useState("");
    const handleChange = (e) =>{
        setSearchText(e.target.value);
    }
    const handleCloseSearch = () =>{
      onClose();
    }
  return (
    <div className='search-box'>
      <div className='search-work'>
        <input onChange={handleChange} value={searchText} className='search-input-box' placeholder='Search for what you want'/>
        <ButtonComponent> <SearchIcon className='search-icon'/> </ButtonComponent>
      </div>
      <div className='search-close'>
        <ButtonComponent onClick={handleCloseSearch}> <CloseIcon className='search-icon'/> </ButtonComponent>
      </div>
    </div>
  )
}

export default Searchbox