import { useState } from 'react'
import './App.css'
import states from "./data/states.json";
import { StepIndicator, StepIndicatorStep, Button } from '@trussworks/react-uswds';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import StepFour from './components/StepFour';
import StepFive from './components/StepFive';

function App() {
  const [step, setStep] = useState(1);

  const statesList = []
  for (let i = 0; i < states.length; i++) {
    let stateName = states[i].name;
    statesList.push(stateName);
  };

  const handleNext = () => {
    step != 4 && setStep(step + 1);
  }

  const handlePrev = () => {
    step != 1 && setStep(step - 1);
  }

  const stepProgress = (count) => {
    if (step === count) {
      return "current"
    }
    else if (step > count) {
      return "complete"
    }
    else null
  }

  return (
    <>
        <StepIndicator counters="small" headingLevel="h4">
            <StepIndicatorStep label="State selection" status={stepProgress(1)} />
            <StepIndicatorStep label="Check eligibility" status={stepProgress(2)} />
            <StepIndicatorStep label="Fill out NVRF" status={stepProgress(3)} />
            <StepIndicatorStep label="Confirm info" status={stepProgress(4)} />
            <StepIndicatorStep label="Print, sign, and e-mail" status={stepProgress(5)} />
        </StepIndicator>

        {step === 1 && <StepOne statesList={statesList}/>}  
        {step === 2 && <StepTwo statesList={statesList}/>}  
        {step === 3 && <StepThree statesList={statesList}/>}  
        {step === 4 && <StepFour statesList={statesList}/>}  
        {step === 5 && <StepFive statesList={statesList}/>}  

      <div className="button-container" style={{ margin:'20px' }}>
        <Button type="button" onClick={handlePrev}>
            Previous
        </Button>
        <Button type="button" onClick={handleNext}>
            Next
        </Button>
      </div>

    </>
  )
}

export default App
