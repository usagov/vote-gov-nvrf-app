import { useState, useEffect } from 'react'
import StateSelection from './views/StateSelection.jsx';
import Eligibility from './views/Eligibility.jsx';
import RegistrationOptions from './views/RegistrationOptions.jsx';
import PathSelection from './views/PathSelection.jsx';
import MultiStepForm from './views/MultiStepForm.jsx';
import {fetchData, sanitizeDOM} from './utils/JsonHelper.jsx';
import { HelmetProvider } from "react-helmet-async";
import {getFieldValue} from "./utils/fieldParser.jsx";

function App() {

  const [states, setStates] = useState('');
  const [content, setContent] = useState('');
  const [navContent, setNavContent] = useState('');
  const [cards, setCards] = useState('');
  const [fieldContent, setFieldContent] = useState('')
  const [stringContent, setStringContent] = useState('')

  useEffect(() => {
    fetchData("states.json", setStates);
    fetchData("pages.json", setContent);
    fetchData("navigation.json", setNavContent);
    fetchData("cards.json", setCards);
    fetchData("fields.json", setFieldContent);
    fetchData("strings.json", setStringContent)
  }, []);

  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState('');
  const [stateData, setStateData] = useState('');
  const [registrationPath, setRegistrationPath] = useState('');
  const [formStep, setFormStep] = useState(1);

  const lastUpdatedSanitized = sanitizeDOM(stateData.nvrf_last_updated_date);
  const lastUpdatedText = (stringContent.lastUpdated);
  const scrollToTop = document.getElementById('scroll-to-top');

  //Confirm eligibility checkbox controls
  const [hasConfirmed, setHasConfirmed] = useState(null);
  const confirmCheckbox = (checkStatus) => {
      setHasConfirmed(checkStatus);
  }

  const setStepFocus = () => {
    scrollToTop.focus();
    scrollToTop.scrollIntoView({ behavior: "instant"});
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
  if (states && content && navContent && fieldContent && stringContent) {

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
               style={{
                 outline: "0 none",
                 display: "block",
                 scrollMargin: "20px"
               }}
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
                    stringContent={stringContent}
                />}
            {step === 2 &&
                <RegistrationOptions
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    stateData={stateData}
                    content={content}
                    navContent={navContent}
                    stringContent={stringContent}
                />}
            {step === 3 &&
                <Eligibility
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    state={selectedState}
                    stateData={stateData}
                    content={content}
                    navContent={navContent}
                    stringContent={stringContent}
                    fieldContent={fieldContent}
                    hasConfirmed={hasConfirmed}
                    confirmCheckbox={confirmCheckbox}
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
                    stringContent={stringContent}
                    getFormStep={getFormStep}
                />}
            {step === 5 &&
                <MultiStepForm
                    handlePrev={handlePrev}
                    statesList={statesList}
                    state={selectedState}
                    stateData={stateData}
                    content={content}
                    navContent={navContent}
                    fieldContent={fieldContent}
                    registrationPath={registrationPath}
                    getFormStep={getFormStep}
                    stringContent={stringContent}
                />}

              {step >= 3 &&
                <div className="text-base usa-prose margin-top-5 maxw-tablet margin-x-auto">
                  <p>{getFieldValue(content, "2c597df4-53b6-4ef5-8301-7817b04e1099", "omb_number")}
                    <br/>
                    {lastUpdatedText.replace("@state_name", stateData.name)}
                    <span dangerouslySetInnerHTML= {{__html: lastUpdatedSanitized}}/>
                 </p>
                  <p><a href="privacy" target="_blank">{stringContent.privacyPolicy}</a></p>
                </div>
              }
          </section>
        </HelmetProvider>
    )
  }
}

export default App;