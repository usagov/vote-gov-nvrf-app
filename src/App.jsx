import { useState } from 'react'
import {HelmetProvider} from "react-helmet-async";
import { DataProvider } from 'Context/DataProvider';
import Eligibility from 'Views/Eligibility';
import PathSelection from 'Views/PathSelection';
import MultiStepForm from 'Views/MultiStepForm';
import Footer from 'Components/Footer';
import './main.css';

export default function App() {
  const [step, setStep] = useState(1);
  const [registrationPath, setRegistrationPath] = useState('');

  const scrollToTop = document.getElementById('scroll-to-top');

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
                />
              }
              {step === 2 &&
                <PathSelection
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                  getRegPath={setRegistrationPath}
                />}
              {step === 3 &&
                <MultiStepForm
                  handlePrev={handlePrev}
                  registrationPath={registrationPath}
                />}
              <Footer />
            </section>
          </DataProvider>
        </HelmetProvider>
      </main>
  );
}