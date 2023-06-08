import { useState } from 'react'
import './App.css'
import states from "./data/states.json";
import { StepIndicator, StepIndicatorStep, Button } from '@trussworks/react-uswds';
import StepOne from './components/StepOne';

function App() {
  const [step, setStep] = useState("one");

  const statesList = []
  for (let i = 0; i < states.length; i++) {
    let stateName = states[i].name;
    statesList.push(stateName);
  };

  const handleNext = () => {
    step === "one" ? setStep("two") : null;
    step === "two" ? setStep("three") : null;
    step === "three" ? setStep("four") : null;
  }

  const handlePrev = () => {
    step === "four" ? setStep("three") : null;
    step === "three" ? setStep("two") : null;
    step === "two" ? setStep("one") : null;
  }

  return (
    <>
        <StepIndicator counters="small" headingLevel="h4">
            <StepIndicatorStep label="Check eligibility" status={step === "one" ? "current" : null } />
            <StepIndicatorStep label="Fill out NVRF" status={step === "two" ? "current" : null } />
            <StepIndicatorStep label="Confirm info" status={step === "three" ? "current" : null } />
            <StepIndicatorStep label="Print, sign, and e-mail" status={step === "four" ? "current" : null } />
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
