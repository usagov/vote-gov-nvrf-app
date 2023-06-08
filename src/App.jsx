import { useState } from 'react'
import './App.css'
import states from "./data/states.json";
import { StepIndicator, StepIndicatorStep, Button } from '@trussworks/react-uswds';
import StepOne from './components/StepOne';

function App() {
  const [step, setStep] = useState(1);

  const statesList = []
  for (let i = 0; i < states.length; i++) {
    let stateName = states[i].name;
    statesList.push(stateName);
  };

  const handleNext = () => {
    step != 4 ? setStep(step + 1) : null;
  }

  const handlePrev = () => {
    step != 1 ? setStep(step - 1) : null;
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
            <StepIndicatorStep label="Check eligibility" status={stepProgress(1)} />
            <StepIndicatorStep label="Fill out NVRF" status={stepProgress(2)} />
            <StepIndicatorStep label="Confirm info" status={stepProgress(3)} />
            <StepIndicatorStep label="Print, sign, and e-mail" status={stepProgress(4)} />
        </StepIndicator>

        {step === "one" ? <StepOne statesList={statesList}/> : null }  

        <Button type="button" onClick={handlePrev}>
            Previous
        </Button>
        <Button type="button" onClick={handleNext}>
            Next
        </Button>
    </>
  )
}

export default App
