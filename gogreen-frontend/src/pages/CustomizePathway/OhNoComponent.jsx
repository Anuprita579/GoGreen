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
import styles from "./styles.module.scss"

const OhNoComponent = () => {
    const { scrollToChoosePathway } = useScroll();
    const navigate = useNavigate();
    const { isLoggedIn, userInfo, login, logout } = useLoginState();
  console.log("isuserLogin inside Pathway Stepper :", isLoggedIn);

  const {activeStep, decrementStep, canAdvanceToNextStep,setDistanceDataValue, setSelectedTransportList, setActiveStep} = useActiveStep(); 
    const handleChangePreferences = () => {
        navigate("/");
        setActiveStep(isLoggedIn===true? 1 : 0); 
        setDistanceDataValue("");
        setSelectedTransportList([]);
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
    <div className={styles.ohnoComponent}>
        <h1 className={styles.heading}>Sorry!</h1>
        <h4 className={styles.content}>We don't have any programs that match your preferences right now.</h4>
        <div className={styles.buttonsSection}>
        {activeStep===1 ? null : <ButtonComponent className={styles.backButtonStepper} onClick={handleBack} > <KeyboardBackspaceIcon /> Back </ButtonComponent>}
        <ButtonComponent children={"Personalise another Pathway"} className={styles.retryButton} onClick={handleChangePreferences} />

        </div>


    </div>
  )
}

export default OhNoComponent