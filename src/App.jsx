import {useState, useEffect} from 'react';
import {HelmetProvider} from "react-helmet-async";
import Eligibility from 'Views/Eligibility';
import PathSelection from 'Views/PathSelection';
import MultiStepForm from 'Views/MultiStepForm';
import { DataProvider } from 'Context/DataProvider';
import loadPdf from 'Utils/pdfLoader';
import Footer from 'Components/Footer';
import './VoteError.css';
import './VoteTouchpoints.css';

export default function App() {
  const [error, setError] = useState(false);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [form, setForm] = useState(null);
  const [step, setStep] = useState(1);
  const [registrationPath, setRegistrationPath] = useState('');
  const [formStep, setFormStep] = useState(1);

  useEffect(() => {
    loadPdf().then(({pdfDoc, form}) => {
      setPdfDoc(pdfDoc);
      setForm(form);
    }).catch(() => setError(true));
  }, []);

  const scrollToTop = document.getElementById('scroll-to-top');

  //Confirm eligibility checkbox controls
  const [hasConfirmed, setHasConfirmed] = useState(null);
  const confirmCheckbox = (checkStatus) => {
    setHasConfirmed(checkStatus);
  }

  const setStepFocus = () => {
    scrollToTop.focus();
    scrollToTop.scrollIntoView({behavior: "instant"});
  }

  const handleNext = () => {
    step !== 3 && setStep(step + 1);
    setStepFocus();
  }

  const handlePrev = () => {
    step !== 1 && setStep(step - 1);
    setStepFocus();
    if (step === 2) {
      // reset eligibility requirement selections for when user has gone back after completing it and changed state selection
      setHasConfirmed(null)
    }
  }

  const getRegPath = (pathSelection) => {
    setRegistrationPath(pathSelection)
  };

  const getFormStep = (step) => {
    formStep === 4 ? null : setFormStep(step + 1);
  };

  if (error) {
    return <div>Error</div>
  }

  return (
      <main>
        <HelmetProvider>
          <DataProvider>
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
                  hasConfirmed={hasConfirmed}
                  confirmCheckbox={confirmCheckbox}
                />
              }
              {step === 2 &&
                <PathSelection
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                  registrationPath={registrationPath}
                  getRegPath={getRegPath}
                  getFormStep={getFormStep}
                />}
              {step === 3 &&
                <MultiStepForm
                  handlePrev={handlePrev}
                  registrationPath={registrationPath}
                  getFormStep={getFormStep}
                  pdfDoc={pdfDoc}
                  form={form}
                />}
              {step >= 1 &&
                <Footer />
              }
            </section>
          </DataProvider>
        </HelmetProvider>
      </main>
  );
}