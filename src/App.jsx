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
  const [selectedState, setSelectedState] = useState('default');
  const [stateData, setStateData] = useState('');
  const [registrationPath, setRegistrationPath] = useState('');

  const statesList = []
  for (let i = 0; i < states.length; i++) {
    let stateName = states[i].name;
    statesList.push(stateName);
  };

  const handleNext = () => {
    step != 5 && setStep(step + 1);
  }

  const handlePrev = () => {
    step != 1 && setStep(step - 1);
  }

  const getSelectedState = (selectedState) => {
    setSelectedState(selectedState);
    for (var i = 0; i < states.length; i++){
      if (states[i].name == selectedState){
      setStateData(states[i]);
    }  
  }}

  const getRegPath = (pathSelection) => {
    setRegistrationPath(pathSelection) 
  };

  return (
    <>
        {step === 1 && 
          <StepOne 
          handleNext={handleNext} 
          getSelectedState={getSelectedState} 
          state={selectedState}
          stateData={stateData}
          />}  
        {step === 2 && 
          <StepTwo 
          handleNext={handleNext} 
          handlePrev={handlePrev} 
          state={selectedState}
          stateData={stateData}
          />}  
        {step === 3 && 
          <StepThree 
          handleNext={handleNext} 
          handlePrev={handlePrev} 
          stateData={stateData}
          registrationPath={registrationPath}
          getRegPath={getRegPath}
          />}  
        {step === 4 && 
          <StepFour 
          handleNext={handleNext} 
          statesList={statesList}
          state={selectedState}
          stateData={stateData}
          registrationPath={registrationPath}
          />}  
        {step === 5 && 
          <StepFive handleNext={handleNext}
          />}  

    </>
  )
}

export default App;