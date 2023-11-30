import { useState, useEffect } from 'react'
import StateSelection from './components/StateSelection';
import Eligibility from './components/Eligibility';
import RegistrationOptions from './components/RegistrationOptions';
import PathSelection from './components/PathSelection';
import MultiStepForm from './components/MultiStepForm';
import {fetchData} from './components/HelperFunctions/JsonHelper.jsx';

function App() {

  const [states, setState] = useState('');
  const [statesOld, setStatesOld] = useState();
  const [stateDataOld, setStateDataOld] = useState('');
  useEffect(() => {
    fetchData("states.json", setState);
  }, []);

  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState('');
  const [stateData, setStateData] = useState('');
  const [registrationPath, setRegistrationPath] = useState('');
  const [formStep, setFormStep] = useState(1);

  //Confirm eligibility checkbox controls
  const [hasConfirmed, setHasConfirmed] = useState(null);
  const [error, setError] = useState(null)
  const confirmCheckbox = (checkStatus) => {
      setHasConfirmed(checkStatus);
      setError(!checkStatus);
  }

  const checkboxValid = () => {
      (hasConfirmed === null) && setError(true);
  }

  const statesList = []
  for (let i = 0; i < states.length; i++) {
    let stateName = states[i].name;
    statesList.push(stateName);
  }

  const handleNext = () => {
    step != 5 && setStep(step + 1);
    document.getElementById('scroll-to-top').scrollIntoView();
  }

  const handlePrev = () => {
    step != 1 && setStep(step - 1);
    document.getElementById('scroll-to-top').scrollIntoView();
  }

  const handleSubmit = (e) => {
    e.preventDefault(e);
}

  const getSelectedState = (selectedState) => {
    setSelectedState(selectedState);
    if (selectedState != "") {
      for (var i = 0; i < states.length; i++){
        if (states[i].name == selectedState){
        setStateData(states[i]);
      }}
    } else {
      setStateData('')
    }
    // reset eligibility requirement selections for when user has gone back after completing it and changed state selection
    setHasConfirmed(null)
  }


  const getRegPath = (pathSelection) => {
    setRegistrationPath(pathSelection)
  };

  const getFormStep = (step) => {
    formStep === 4 ? null : setFormStep(step + 1);
  };

  return (
    <>
    <section className="usa-prose">
    <div id="scroll-to-top"></div>
        {step === 1 &&
          <StateSelection
          handleNext={handleNext}
          handleSubmit={handleSubmit}
          getSelectedState={getSelectedState}
          state={selectedState}
          stateData={stateData}
          />}
        {step === 2 &&
            <RegistrationOptions
              handleNext={handleNext}
              handlePrev={handlePrev}
              stateData={stateData}
          />}
        {step === 3 &&
          <Eligibility
          handleNext={handleNext}
          handlePrev={handlePrev}
          state={selectedState}
          stateData={stateData}
          hasConfirmed={hasConfirmed}
          error={error}
          confirmCheckbox={confirmCheckbox}
          checkboxValid={checkboxValid}
        />}
        {step === 4 &&
          <PathSelection
          handleNext={handleNext}
          handlePrev={handlePrev}
          stateData={stateData}
          registrationPath={registrationPath}
          getRegPath={getRegPath}
          getFormStep={getFormStep}
          />}
        {step === 5 &&
          <MultiStepForm
          // handleNext={handleNext}
          handlePrev={handlePrev}
          statesList={statesList}
          state={selectedState}
          stateData={stateData}
          registrationPath={registrationPath}
          getFormStep={getFormStep}
          />}
        </section>
    </>
  )
}

export default App;