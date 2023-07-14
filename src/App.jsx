import { useState, useEffect } from 'react'
import states from "./data/states.json";
import StateSelection from './components/StateSelection';
import VotingInfo from './components/VotingInfo';
import PathSelection from './components/PathSelection';
import MultiStepForm from './components/MultiStepForm';

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
    step != 4 && setStep(step + 1);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  const handlePrev = () => {
    step != 1 && setStep(step - 1);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
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
    <div id="top"></div>
        {step === 1 && 
          <StateSelection 
          handleNext={handleNext} 
          handleButtonStatus={handleButtonStatus}
          getSelectedState={getSelectedState} 
          state={selectedState}
          stateData={stateData}
          buttonStatus={buttonStatusOne}
          />}  
        {step === 2 && 
          <VotingInfo 
          handleNext={handleNext} 
          handlePrev={handlePrev}
          handleRadio={handleRadio}
          state={selectedState}
          stateData={stateData}
          buttonDisabled={buttonDisabled}
          radioValid={radioValid}
          />}  
        {step === 3 && 
          <PathSelection 
          handleNext={handleNext} 
          handlePrev={handlePrev} 
          stateData={stateData}
          registrationPath={registrationPath}
          getRegPath={getRegPath}
          getFormStep={getFormStep}
          />}  
        {step === 4 && 
          <MultiStepForm 
          handleNext={handleNext} 
          handlePrev={handlePrev}
          statesList={statesList}
          state={selectedState}
          stateData={stateData}
          registrationPath={registrationPath}
          getFormStep={getFormStep}
          />}
    </>
  )
}

export default App;