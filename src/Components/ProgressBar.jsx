import {StepIndicator, StepIndicatorStep} from '@trussworks/react-uswds';
import './ProgressBar.css';

function ProgressBar(props) {
  const steps = props.steps;
  const currentStep = props.step;
  // Set progress bar array by machine name.
  const stepList = {
    1: 'personal',
    2: 'address',
    3: 'identification',
    4: 'party',
    5: 'confirmation',
    6: 'complete',
  }
  // Set current step message and replace placeholder "@label".
  let currentStepMessage = steps[stepList[currentStep]].aria_label.replace("@label", steps[stepList[currentStep]].label);

  const stepProgress = (count) => {
    if (currentStep === count) {
      return "current"
    } else if (currentStep > count) {
      return "complete"
    } else null
  }

  const handleGoBackSteps = props.handleGoBack;

  const setStep = props.setStep;

  const finalStep = Object.keys(stepList).length;

  const styles = (step) => {
    if (currentStep < finalStep && stepProgress(step) === "complete") {
      return "step-indicator-select"
    }
    return "step-indicator-no-select";
  }

  return (
    <>
      <div aria-live="polite" aria-atomic="true"
           className="usa-sr-only">{currentStepMessage}</div>
      <StepIndicator centered className="margin-top-4" headingLevel="h2">

        {Object.keys(stepList)
          .map((step) => parseInt(step)) // step is originally a string, so convert to int
          .map((step) => (

            <StepIndicatorStep
              key={step}
              className={styles(step)}
              label={steps[stepList[step]].label}
              data-analytics={'Step indicator ' + steps[stepList[step]].label}
              status={stepProgress(step)}
              tabIndex={stepProgress(step) === 'complete' && currentStep !== finalStep ? 0 : null}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && stepProgress(step) === 'complete') {
                  setStep(step);
                }
              }}
              onClick={stepProgress(step) === 'complete' && currentStep !== finalStep ? handleGoBackSteps(currentStep - step) : null}
            />

          ))}

      </StepIndicator>
    </>
  );
}

export default ProgressBar;