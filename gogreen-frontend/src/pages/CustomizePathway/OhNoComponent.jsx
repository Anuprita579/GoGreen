import React from 'react'
import { useNavigate } from 'react-router-dom';
//useContext
import { useLoginState } from '../../utils/LoginStateContext';
import { useActiveStep } from '../../utils/ActiveStepContext';
import { useScroll } from '../../utils/ScrollContext';
//Common Components
import ButtonComponent from '../../commonComponents/ButtonComponent';
//MUI ICONS
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const OhNoComponent = () => {
    const { scrollToChoosePathway } = useScroll();
    const navigate = useNavigate();
    const { isLoggedIn, userInfo, login, logout } = useLoginState();
  console.log("isuserLogin inside Pathway Stepper :", isLoggedIn);

  const {activeStep, decrementStep, canAdvanceToNextStep, setActiveStep, setSelectedDegree, setSelectedUniversity, setSelectedLocation, setSelectedJob, dataAvailable} = useActiveStep(); 
    const handleChangePreferences = () => {
        navigate("/");
        setActiveStep(isLoggedIn===true? 1 : 0); 
        setSelectedDegree(null);
        setSelectedUniversity(null);
        setSelectedLocation(null);
        setSelectedJob([]);
        const delayTime = 300;
        const timer = setTimeout(() => {
            scrollToChoosePathway();
        }, delayTime);

        return () => clearTimeout(timer);
    }
    const handleBack = () => {
      if (activeStep===0){
        navigate("/");
      }
      else{
        decrementStep();
      }
    }

  return (
    <div className='ohno-component'>
        {/* <img src={OhNoImage} alt='sorry' className='ohno-image'/> */}
        <h1 className='heading'>Sorry!</h1>
        <h4 className='content'>We don't have any programs that match your preferences right now.</h4>
        <div className='buttons-section'>
        {activeStep===1 ? null : <ButtonComponent className={'back-button-stepper'} onClick={handleBack} > <KeyboardBackspaceIcon /> Back </ButtonComponent>}
        <ButtonComponent children={"Personalise another Pathway "} className={'retry-button'} onClick={handleChangePreferences} />

        </div>


    </div>
  )
}

export default OhNoComponent