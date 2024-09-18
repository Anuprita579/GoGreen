import React , { useEffect }from 'react'
import { useNavigate } from 'react-router-dom'
//useContext
import { useActiveStep } from '../../utils/ActiveStepContext'
//Common Components
import HorizontalStepper from '../../commonComponents/HorizontalStepper'
//Imports
import Signin from './Signin'
import Distance from './Distance'
import Transport from "./Transport"
import FinalComponent from './FinalComponent'

const PathwayStepper = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('signInCompleted'); 

  const {activeStep, setActiveStep, setDistanceDataValue} = useActiveStep(); 
  console.log("active Step is : ", activeStep);
  const handleNavigate = () =>{
    navigate("/leaderboard");
  }

  useEffect(() => {
    if (activeStep === 3) { 
      setActiveStep(isLoggedIn===true? 1 : 0); 
      setDistanceDataValue("");
    }
  }, [activeStep, isLoggedIn, setActiveStep, setDistanceDataValue]);
  return (
    <>
        <HorizontalStepper 
            stepLabels={['Signin', 'Distance', 'Mode of Transport']}
            stepComponents={[
                <Signin/>,
                <Distance />,
                <Transport />
            ]}
            FinishComponent={() => <FinalComponent />}
            showNextButton={activeStep>0 }
            showBackButton={activeStep>1 }
            stepperClassName={'stepper-connector'}
            finalButtonContent="Next"
            buttonNextClassName={'next-button'}
            buttonBackClassName={'back-button-stepper'}
            finalButtonAction={handleNavigate}
        />
    </>
  )
}

export default PathwayStepper