import React, { useContext, useState } from 'react';
//useContext
import { useActiveStep } from '../utils/ActiveStepContext';
//Common Components
import Button from "./ButtonComponent"
import AlertComponent from './AlertComponent';
//MUI Components
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
//MUI ICONS
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const HorizontalStepper = ({ 
  stepLabels, 
  stepComponents, 
  FinishComponent, 
  showNextButton, 
  showBackButton, 
  finalButtonContent, 
  stepperClassName,
  buttonBackClassName, 
  buttonNextClassName, 
  buttonSkipClassName, 
  disabledNextButton, 
  finalButtonAction, 
  isOptional = () => false 
}) => {
  const { activeStep, incrementStep, decrementStep, resetStep,canAdvanceToNextStep } = useActiveStep();
  const [skipped, setSkipped] = useState(new Set()); // Initialize skipped state
  const [showAlert, setShowAlert] = useState(false);

  const isStepOptional = (step) => {
    return isOptional(step) || (() => false)(step); // Fallback to default if isOptional is not provided
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (!canAdvanceToNextStep()) {
      setShowAlert(true);
      return;
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    incrementStep(); // Use incrementStep from context
    setSkipped(newSkipped); // Update skipped state
  };

  const handleBack = () => {
    decrementStep(); // Use decrementStep from context
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    incrementStep(); // Use incrementStep from context
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    }); // Update skipped state
  };

  const handleReset = () => {
    resetStep(); // Use resetStep from context
    setSkipped(new Set()); // Reset skipped state
  };

  const handleFinish = () => {
    if (!canAdvanceToNextStep()) {
      setShowAlert(true);
      return;
    }
    incrementStep(); // Use incrementStep from context
    if(finalButtonAction){
      finalButtonAction();
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel className={stepperClassName}>
        {stepLabels.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === stepLabels.length? (
        <FinishComponent onFinish={handleFinish}/>
      ) : (
        <Box sx={{display: "flex", flexDirection: "column" , justifyContent: "center", alignItems: "center", marginBottom: "50px"}}>
          {stepComponents[activeStep]}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2}}>
            {activeStep!== 0 && showBackButton && (
                <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                className={buttonBackClassName}
              >
                <KeyboardBackspaceIcon />
                Back
              </Button>
            )}
            
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }} className={buttonSkipClassName}>
                Skip
              </Button>
            )}
            {/* <Button onClick={activeStep === stepLabels.length - 1? handleFinish : handleNext}>
              {activeStep === stepLabels.length - 1? 'Finish' : 'Next'}
            </Button> */}
            {showNextButton && (
               <Button disabled={disabledNextButton} onClick={activeStep === stepLabels.length - 1? handleFinish : handleNext} className={buttonNextClassName}>
                  {activeStep === stepLabels.length - 1? (finalButtonContent || 'Finish') : 'Next'}
               </Button>
             )
            }
            
          </Box>
        </Box>
      )}
      <AlertComponent
          open={showAlert}
          onClose={() => setShowAlert(false)}
          message='Please select an option'
          severity="error"
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          transition='slide'
        />
    </Box>
  );
};

HorizontalStepper.propTypes = {
  stepLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  stepComponents: PropTypes.arrayOf(PropTypes.element).isRequired,
  FinishComponent: PropTypes.elementType.isRequired,
};

export default HorizontalStepper;


// How to access it ??
// function App() {
//   return (
//     <HorizontalStepper
//         stepLabels={['Step 1', 'Step 2', 'Step 3']}
//         stepComponents={[<Step1 />, <Step2 />, <Step3 />]}
//         FinishComponent={FinishCompo}
//         isOptional={(index) => index === 2} // Only the third step is optional
//     />
//   );
// }
// export default App;