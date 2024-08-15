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

  const {activeStep, setActiveStep, setSelectedDegree, setSelectedUniversity, setSelectedLocation, setSelectedJob, dataAvailable} = useActiveStep(); 
  const handleNavigate = () =>{
    navigate("/pathway-comparison");
  }

  useEffect(() => {
    if (activeStep === 5) { 
      setActiveStep(isLoggedIn===true? 1 : 0); 
      setSelectedDegree(null);
      setSelectedUniversity(null);
      setSelectedLocation(null);
      setSelectedJob([]);
    }
  }, [activeStep, isLoggedIn, setActiveStep, setSelectedDegree, setSelectedUniversity, setSelectedLocation, setSelectedJob]);
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
            showNextButton={activeStep >0 && dataAvailable}
            showBackButton={activeStep>1 && dataAvailable}
            stepperClassName={'stepper-connector'}
            finalButtonContent="Next"
            buttonNextClassName={'next-button'}
            buttonBackClassName={'back-button-stepper'}
            finalButtonAction={handleNavigate}
        />

        {activeStep ===2 && (
          <div className='university-disclaimer'>
            <p><span>*Please note:</span> Enrollment is subject to meeting the eligibility criteria of the university.</p>
          </div>
        )}
    </>
  )
}

export default PathwayStepper