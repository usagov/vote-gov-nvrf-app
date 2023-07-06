import { useState, useEffect } from 'react'
import './App.css'
import states from "./data/states.json";
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
  const [buttonStatusOne, setButtonStatusOne] = useState(true)
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [radioValid, setRadioValid] = useState({
    citizen: "no selection",
    age: "no selection"
  })
  const [formStep, setFormStep] = useState(1);

  useEffect(() => {
    let validateBoth = (radioValid.citizen === true) && (radioValid.age === true) ? true : false;
    setButtonDisabled(validateBoth)
  }, [radioValid]);

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
    };
    // reset eligibilty requirement selections for when user has gone back after completing it and changed state selection
    setRadioValid({
      citizen: "no selection",
      age: "no selection"
    });
  }}

  const getRegPath = (pathSelection) => {
    setRegistrationPath(pathSelection) 
  };

  const handleButtonStatus = (value, step) => {
    if (step === 'one') {
      value != 'default' ? setButtonStatusOne(false) : setButtonStatusOne(true);
    }
  }

  const handleRadio = (id) => {
      if (id === 'yes-citizen') {
      setRadioValid({citizen: true, age: radioValid.age})
    } else if (id === 'no-citizen') {
      setRadioValid({citizen: false, age: radioValid.age})
    } else if (id === 'yes-age') {
      setRadioValid({citizen: radioValid.citizen, age: true,})
    } else if (id === 'no-age') {
      setRadioValid({citizen: radioValid.citizen, age: false,})
    }
}

  const getFormStep = (step) => {
    formStep === 3 ? null : setFormStep(step + 1);
  };

  return (
    <>
        {step === 1 && 
          <StepOne 
          handleNext={handleNext} 
          handleButtonStatus={handleButtonStatus}
          getSelectedState={getSelectedState} 
          state={selectedState}
          stateData={stateData}
          buttonStatus={buttonStatusOne}
          />}  
        {step === 2 && 
          <StepTwo 
          handleNext={handleNext} 
          handlePrev={handlePrev}
          handleRadio={handleRadio}
          state={selectedState}
          stateData={stateData}
          buttonDisabled={buttonDisabled}
          radioValid={radioValid}
          />}  
        {step === 3 && 
          <StepThree 
          handleNext={handleNext} 
          handlePrev={handlePrev} 
          stateData={stateData}
          registrationPath={registrationPath}
          getRegPath={getRegPath}
          getFormStep={getFormStep}
          />}  
        {step === 4 && 
          <StepFour 
          handleNext={handleNext} 
          handlePrev={handlePrev}
          statesList={statesList}
          state={selectedState}
          stateData={stateData}
          registrationPath={registrationPath}
          getFormStep={getFormStep}
          />}
        {step === 5 && 
          <StepFive
              handleNext={handleNext}
              handlePrev={handlePrev}
          />}  

    </>
  )
}

export default App;