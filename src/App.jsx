import { useState, useEffect } from 'react'
import Eligibility from 'Views/Eligibility.jsx';
import PathSelection from 'Views/PathSelection.jsx';
import MultiStepForm from 'Views/MultiStepForm.jsx';
import {fetchData, fetchStaticData, sanitizeDOM} from 'Utils/JsonHelper.jsx';
import { HelmetProvider } from "react-helmet-async";
import loadPdf from './Utils/pdfLoader';
import {Alert} from "@trussworks/react-uswds";
import './VoteError.css';


const currentStateId = document.getElementById('root').getAttribute('data-stateId');
const returnPath = document.getElementById('root').getAttribute('data-returnPath');

function App() {
  const [states, setStates] = useState('');
  const [content, setContent] = useState('');
  const [navContent, setNavContent] = useState('');
  const [cards, setCards] = useState('');
  const [fieldContent, setFieldContent] = useState('')
  const [stringContent, setStringContent] = useState('')

  const [error, setError] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [form, setForm] = useState(null);

  useEffect(() => {
    loadPdf().then(({ pdfDoc, form }) => {
      setPdfDoc(pdfDoc);
      setForm(form);
    }).catch(() => setError(true));
  }, []);

  useEffect(() => {
    fetchData("states.json", setStates, setError);
    fetchData("pages.json", setContent, setError);
    fetchData("cards.json", setCards, setError);
    fetchData("fields.json", setFieldContent, setError);
    fetchStaticData("navigation.json", setNavContent, setError);
    fetchStaticData("strings.json", setStringContent, setError);
  }, []);

  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState('');
  const [stateData, setStateData] = useState('');
  const [registrationPath, setRegistrationPath] = useState('');
  const [formStep, setFormStep] = useState(1);

  const lastUpdatedSanitized = sanitizeDOM(stateData.nvrf_last_updated_date);
  const lastUpdatedText = stringContent ? stringContent.lastUpdated : null;
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
    step != 3 && setStep(step + 1);
    setStepFocus();
  }

  const handlePrev = () => {
    step != 1 && setStep(step - 1);
    setStepFocus();
  }

  const getSelectedState = (selectedState) => {
    if (selectedState !== "" && states) {
      for (let i = 0; i < states.length; i++){
        if (states[i].abbrev == selectedState.toLowerCase()){
          setSelectedState(states[i].name);
          setStateData(states[i]);
        }
      }
    } else {
      setStateData('')
    }
    // reset eligibility requirement selections for when user has gone back after completing it and changed state selection
    setHasConfirmed(null)
  }

  useEffect(() => {
    getSelectedState(currentStateId);
  }, [getSelectedState, states]);


  const getRegPath = (pathSelection) => {
    setRegistrationPath(pathSelection)
  };

  const getFormStep = (step) => {
    formStep === 4 ? null : setFormStep(step + 1);
  };

  // If the fetch for content or pdf fails display an error message.
  if (error) {
    return <div>
      <Alert type="error" heading="Error" headingLevel="h1">
        <p>The form filler tool failed to load.</p>
      </Alert>
      <p>
        <button className={'usa-button'} onClick={() => window.location.reload()}>Try loading the tool again</button>
      </p>
      <p>If you were unable to use our form filler tool, <a
          href="https://touchpoints.app.cloud.gov/touchpoints/c169d3b2/submit" target="_blank">submit feedback</a>.</p>
    </div>;
  }

  // Only render the markup if the data is loaded.
  if (states && cards && content && navContent && fieldContent && stringContent) {
    // Get NVRF footer card
    const cardFooter = cards.find(item => item.uuid === "5922e06c-ac2f-475d-ab10-abfdeb65de43");

    const statesList = []
    for (let i = 0; i < states.length; i++) {
      let stateName = states[i].name;
      statesList.push(stateName);
    }

    return (
        <HelmetProvider>
          <section>
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
                    returnPath={returnPath}
                />}
            {step === 2 &&
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
            {step === 3 &&
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
                    pdfDoc={pdfDoc}
                    form={form}
                />}

              {step >= 1 &&
                <div className="text-base margin-top-5 maxw-tablet margin-x-auto">
                  <p>
                    {lastUpdatedText.replace("@state_name", stateData.name)} <span dangerouslySetInnerHTML={{__html: lastUpdatedSanitized}}/>
                  </p>
                  {cardFooter && (
                      <div dangerouslySetInnerHTML={{__html: sanitizeDOM(cardFooter.body)}}></div>
                  )}
                </div>
              }
          </section>
        </HelmetProvider>
    )
  }
}

export default App;