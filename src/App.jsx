import { useState, useEffect } from 'react'
import StateSelection from './components/StateSelection';
import Eligibility from './components/Eligibility';
import RegistrationOptions from './components/RegistrationOptions';
import PathSelection from './components/PathSelection';
import MultiStepForm from './components/MultiStepForm';
import {fetchData} from './components/HelperFunctions/JsonHelper.jsx';
import { HelmetProvider } from "react-helmet-async";
import {getFieldValue} from "./components/HelperFunctions/fieldParser";
import DOMPurify from 'dompurify';
import { renderToStaticMarkup } from 'react-dom/server';

function App() {

  const [states, setStates] = useState('');
  const [content, setContent] = useState('');
  const [navContent, setNavContent] = useState('');
  const [cards, setCards] = useState('');
  const [fieldContent, setFieldContent] = useState('')

  useEffect(() => {
    fetchData("states.json", setStates);
    fetchData("pages.json", setContent);
    fetchData("navigation.json", setNavContent);
    fetchData("cards.json", setCards);
    fetchData("fields.json", setFieldContent);
  }, []);

  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState('');
  const [stateData, setStateData] = useState('');
  const [registrationPath, setRegistrationPath] = useState('');
  const [formStep, setFormStep] = useState(1);

  const lastUpdatedSanitized = DOMPurify.sanitize(stateData.nvrf_last_updated_date);
  const lastUpdatedText = "@state_name information last updated ";
  const scrollToTop = document.getElementById('scroll-to-top');

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

  const setStepFocus = () => {
    scrollToTop.focus();
  }

  const handleNext = () => {
    step != 5 && setStep(step + 1);
    setStepFocus();
  }

  const handlePrev = () => {
    step != 1 && setStep(step - 1);
    setStepFocus();
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

  // Only render the markup if the data is loaded.
  if (states && content && navContent && fieldContent) {

    const statesList = []
    for (let i = 0; i < states.length; i++) {
      let stateName = states[i].name;
      statesList.push(stateName);
    }

    return (
        <HelmetProvider>
          <section className="usa-prose">
            <a name="scroll-to-top"
               id="scroll-to-top"
               tabIndex={-1}
               style={{outline: "0 none"}}
            ></a>
            {step === 1 &&
                <StateSelection
                    handleNext={handleNext}
                    handleSubmit={handleSubmit}
                    states={states}
                    statesList={statesList}
                    getSelectedState={getSelectedState}
                    state={selectedState}
                    stateData={stateData}
                    content={content}
                    navContent={navContent}
                    fieldContent={fieldContent}
                />}
            {step === 2 &&
                <RegistrationOptions
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    stateData={stateData}
                    content={content}
                    navContent={navContent}
                />}
            {step === 3 &&
                <Eligibility
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    state={selectedState}
                    stateData={stateData}
                    content={content}
                    navContent={navContent}
                    cards={cards}
                    fieldContent={fieldContent}
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
                    content={content}
                    navContent={navContent}
                    cards={cards}
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
                    content={content}
                    navContent={navContent}
                    fieldContent={fieldContent}
                    registrationPath={registrationPath}
                    getFormStep={getFormStep}
                />}

              {step >= 3 &&
                <div className="margin-top-4 text-base">
                  <div>{getFieldValue(content, "2c597df4-53b6-4ef5-8301-7817b04e1099", "omb_number")}</div>
                  <span className="last-updated">
                    {lastUpdatedText.replace("@state_name", stateData.name)}
                    <span dangerouslySetInnerHTML= {{__html: lastUpdatedSanitized}}/>
                 </span>
                  <div><a href="/privacy-policy/">Privacy policy</a></div>
                </div>
              }
          </section>
        </HelmetProvider>
    )
  }
}

export default App;